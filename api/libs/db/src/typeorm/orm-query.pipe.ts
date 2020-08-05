import { Injectable, PipeTransform } from '@nestjs/common';
import { parseQuery } from './parse-to-orm-query';
import { ParsedOrmWhere } from '../db.types';

/**
 * Wrapper around parseQuery function to be used as a pipe
 * @example
 * method(@Body(OrmQueryPipe) user: OrmQuery) {}
 */
@Injectable()
export class OrmQueryPipe<T = any> implements PipeTransform {
  transform(value: any): ParsedOrmWhere<T> {
    return parseQuery(value);
  }
}
