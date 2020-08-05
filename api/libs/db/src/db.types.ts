import { FindConditions, FindOperator, ObjectLiteral } from 'typeorm';

/**
 * Object that was parsed with parseQuery
 */
export interface ParsedOrmWhere<T = any> {
  [key: string]: FindOperator<T>;
}

/**
 * Types that can be passed as TypeOrm where param
 */
export type OrmWhere<T = any> =
  | FindConditions<T>[]
  | FindConditions<T>
  | ObjectLiteral
  | string
  | undefined;
