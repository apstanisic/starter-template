/**
 * Regular string, just to make it more clear what type of string it is
 */
export type UUID = string;

/**
 * ID can be UUID or number
 */
export type IdType = UUID | number;

/**
 * Object that contains id filed, and any other fields
 */
export interface WithId<T extends IdType = IdType> {
  id: T;
  [key: string]: any;
}

/**
 * Shorthand for Record where key is string, and second param can be any
 */
export type Struct<T = any> = Record<string, T>;

export interface WithOwner {
  ownerId: UUID;
}
