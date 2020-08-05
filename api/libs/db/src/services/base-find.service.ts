import { IdType, WithId } from '@core/common';
import { InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import {
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  ObjectLiteral,
  Repository,
} from 'typeorm';
import { OrmWhere, ParsedOrmWhere } from '../db.types';
import { PaginationParams } from '../pagination/pagination-options';
import { PgResult } from '../pagination/pagination.types';
import { paginate } from '../pagination/_paginate.helper';
import { parseQuery } from '../typeorm/parse-to-orm-query';

export type FindOneParams<T> = Omit<FindOneOptions<T>, 'where'>;
export type FindManyParams<T> = Omit<FindManyOptions<T>, 'where'>;

type Where<Entity> =
  | FindConditions<Entity>[]
  | FindConditions<Entity>
  | ObjectLiteral
  | string
  | null
  | undefined;

/**
 * Base service for finding entities.
 * BaseService extends this class with methods that changes entities.
 * This is separated because LoggerService can extend this class,
 * but not BaseService class. It's because it's used in main class.
 */
export class BaseFindService<Entity extends WithId = any> {
  constructor(protected readonly repository: Repository<Entity>) {}

  /** Terminal logger */
  protected logger = new Logger(BaseFindService.name);

  /** Use only when you must. If this method is used, that means api should be updated */
  public _getRepository(): Repository<Entity> {
    return this.repository;
  }

  /**
   * Find companies that match criteria
   * If filter is string or number it will search for Id
   * @example Left is passed value, right is parsed
   * ({ price__lt: 5 } => { price: LessThan(5) })
   */
  async findOne(
    filter: OrmWhere<Entity> | IdType,
    searchOptions: FindManyOptions<Entity> = {},
  ): Promise<Entity> {
    let entity: Entity | undefined;
    let where;

    // If string or number, then search by id
    // If filter is string convert to IdObject, othervise use filter
    where = typeof filter === 'string' || typeof filter === 'number' ? { id: filter } : filter;

    // searchOptions.where is additional filter that server can pass manually
    where = this.combineWheres(where, searchOptions.where);

    try {
      entity = await this.repository.findOne({ ...searchOptions, where });
    } catch (error) {
      throw this.internalError('FindOne error', error);
    }

    if (!entity) throw new NotFoundException();
    return entity;
  }

  /**
   * Find entities by multiple ids
   */
  async findByIds(ids: IdType[], searchOptions: FindManyOptions<Entity> = {}): Promise<Entity[]> {
    try {
      const entities = await this.repository.findByIds(ids, searchOptions);
      return entities;
    } catch (error) {
      throw this.internalError('FindbyIds error', error);
    }
  }

  /**
   * Find all entities that match criteria
   */
  async find(
    filter: OrmWhere<Entity> = {},
    searchOptions: FindManyOptions<Entity> = {},
  ): Promise<Entity[]> {
    const where = this.combineWheres(filter, searchOptions.where);
    try {
      const res = await this.repository.find({ ...searchOptions, where });
      return res;
    } catch (error) {
      throw this.internalError('Find error', error);
    }
  }

  /**
   * Find entities that match criteria with pagination.
   * Pagination has it's own error handling. Don't handle errors twice
   * You can pass where query in options object or as a second param.
   * It will merge both wheres, with newer where having presedance.
   */
  async paginate(options: PaginationParams<Entity>, where?: OrmWhere<Entity>): PgResult<Entity> {
    options.where = this.combineWheres(options.where, where);

    const paginated = await paginate({ repository: this.repository, options });
    return paginated;
  }

  /**
   * Count result of a query
   */
  async count(
    filter: OrmWhere<Entity>,
    searchOptions: FindManyOptions<Entity> = {},
  ): Promise<number> {
    const where = this.combineWheres(filter, searchOptions.where);
    try {
      const count = await this.repository.count({ ...searchOptions, where });
      return count;
    } catch (error) {
      throw this.internalError('Count error', error);
    }
  }

  /**
   * Helper to throw internal error
   */
  protected internalError(message: string, error?: any): InternalServerErrorException {
    this.logger.error(message, error);
    return new InternalServerErrorException();
  }

  /**
   * Combine 2 where. If both aren't objects take 1 that is. If neither are take 1st
   */
  protected combineWheres(
    where1: Where<Entity> = {},
    where2: Where<Entity> = {},
  ): ParsedOrmWhere<Entity> {
    let combined;
    if (typeof where1 === 'object' && typeof where2 === 'object') {
      combined = { ...where1, ...where2 };
    } else if (typeof where1 === 'object') {
      combined = { ...where1 };
    } else if (typeof where2 === 'object') {
      combined = { ...where2 };
    } else {
      combined = where1;
    }
    return parseQuery(combined);
  }
}
