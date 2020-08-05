import { Struct, WithId } from '@core/common';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { isEmpty, isNotIn, isNumberString, isUUID } from 'class-validator';
import { escape as e } from 'sqlstring';
import { FindOperator, Raw } from 'typeorm';

/** Parse cursor to proper where query part */
export class ParseCursor<T extends WithId = any> {
  /**
   * Part of TypeOrm query used for pagination
   * When this class parses cursor it will generate this query
   * to be used in TypeOrm repo to paginate data in combination with user
   * fillters. This should be passed last so it is not overwritten
   *  */
  query: { [key: string]: FindOperator<any> };

  /** Previous or next page. Different form order by desc | asc */
  direction: 'prev' | 'next';

  /** UUID from cursor (1st param). Id is used for starting point. > then id */
  private id: string;

  /** Column name from cursor (2nd param) */
  private columnName: string;

  /** Column value from cursor (3nd param) */
  private columnValue: any;

  /**
   * @param cursor that needs to be parsed
   * @param order that db will use to sort.
   * @param table Get from repository.metadata.targetName, it's needed for mysql
   * because when there is join, mysql don't know which id to use.
   * It will use column from columnName property
   */
  constructor(
    private cursor: string,
    private order: 'ASC' | 'DESC' = 'DESC',
    private table: string,
  ) {
    // Converts base64 to normal text
    // const decodedCursor = Buffer.from(this.cursor, 'base64').toString('ascii');
    const decodedCursor = this.cursor;
    // Split cursor so we can get id, column and value, and maybe type
    // Type is not currently used.
    const [id, columnName, columnValue, direction] = decodedCursor.split(';');

    if (isEmpty(columnValue)) {
      throw new BadRequestException('Invalid column');
    }

    if (isNotIn(direction, ['prev', 'next'])) {
      throw new BadRequestException('Bad direction');
    }

    this.id = id;
    this.columnName = columnName;
    this.columnValue = columnValue;
    this.direction = direction as 'prev' | 'next';

    this.convertValueToCorrectType();
    this.query = this.toTypeOrmQuery();

    // this.query = this.parsedValue;
  }

  /** Parse cursor to TypeOrm query item */
  private toTypeOrmQuery(): Struct<FindOperator<any>> {
    // Id must be valid UUID
    if (!isUUID(this.id)) {
      throw new BadRequestException("Cursor's Id part not UUID");
    }

    // Sign to be use in cursor query. Order is passed in constructor
    // If ascending order use >, if descending use <
    let sign = this.order === 'ASC' ? '>' : '<';
    // Reverse sign if we want previous page
    if (this.direction === 'prev') {
      sign = sign === '>' ? '<' : '>';
    }
    // Where part in case query value is different then provided cursor value
    const valueIsDiff = (column: string): string => `${column} ${sign} ${e(this.columnValue)}`;

    // Where part in case query value is same as provided cursor value
    const valueIsEqual = (column: string): string => `${column} = ${e(this.columnValue)}`;

    return {
      [this.columnName]: Raw(alias => {
        // Alias is real column name. If column does not exist it will be falsy
        if (!alias) {
          throw new InternalServerErrorException('Column name empty');
        }
        const query = `( ${valueIsDiff(alias)} OR ( ${valueIsEqual(alias)} AND ${
          this.table
        }.id ${sign} ${e(this.id)}) )`;

        return query;
      }),
    };
  }

  /** Parse value to correct type.
   * If column name ends with At, it will convert column value to date
   * Currently there should not be passed type */
  private convertValueToCorrectType(): void {
    // If column name ends with At assume it's a date and convert
    let converted;
    if (this.columnName.endsWith('At')) {
      // If number check if value is timestamp or iso time
      if (isNumberString(this.columnValue)) {
        converted = new Date(Number(this.columnValue));
      } else {
        converted = new Date(this.columnValue);
      }
    } else {
      // Else simply use string
      converted = this.columnValue;
    }

    this.columnValue = converted;
  }
}
