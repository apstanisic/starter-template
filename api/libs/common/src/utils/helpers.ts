import { Struct } from '../types';

/**
 * Removes properties that are null, undefined or empty string
 * Usefull for updating values on server, and striping empty values from forms
 * Example:
 * const from = { a: 'Hello', b: '', c: null, d: undefined };
 * const to = { a: 'Hello' };
 */
export function removeEmptyItems(obj: Struct): Struct {
  const validItems: Struct = {};

  Object.keys(obj).forEach((key: string) => {
    const value = obj[key];
    if (value !== '' && value !== null && value !== undefined) {
      validItems[key] = value;
    }
  });

  return validItems;
}

/**
 * Make pause for provided miliseconds
 */
export function wait(time: number): Promise<void> {
  return new Promise((res): void => {
    setTimeout(res, time);
  });
}

/**
 * Convert any value to object
 * If value is string, null or undefined return empty object
 * It will convert JSON string to object literal.
 * Always returns new object
 */
export function convertToObject<T = any>(query: Struct<T> | string | null | undefined): Struct {
  if (typeof query === 'object') return { ...query };
  if (query === null || query === undefined) return {};

  if (typeof query === 'string') {
    try {
      const parsed = JSON.parse(query);
      return Array.isArray(parsed) ? {} : parsed;
    } catch (error) {
      return {};
    }
  }
  return {};
}

/**
 * Accepts array or any other type.
 * If not array, make it a single item array.
 * Othervise return array,
 * Lodash have this method. But I don't want whole
 * lodash for 1 method.
 */
export function castArray<T>(item: T | T[]): T[] {
  if (Array.isArray(item)) {
    return item;
  }
  return [item];
}

/**
 * Disables certain key in object
 * For example, object can't have field that contains password
 * Eg. 'password', 'password_lt', 'awesomepasswordfield'
 */
export function hasForbiddenKey(obj: Struct, key: string): boolean {
  return Object.keys(obj).some((objectKey) => {
    return objectKey.toLowerCase().includes(key.toLowerCase());
  });
}

/**
 * Parse given value to number. Will not throw an error, return undefined.
 * Usefull for methods that need to have whole number.
 * Will not return NaN, or float. Either int or undefined.
 */
export function parseNumber(value?: any): number | undefined {
  if (typeof value === 'string') {
    const parsedValue = parseInt(value, 10);
    return Number.isNaN(parsedValue) ? undefined : parsedValue;
  }
  if (typeof value === 'number') {
    return Math.floor(value);
  }
  return undefined;

  // swit
}

/**
 * Get number from object with given key
 * I am still not sold on usefulnes of this method
 */
export function getIntFromObject(obj: any, key: string): number | undefined {
  if (obj && typeof obj === 'object') {
    const initValue = obj[key];
    const parsedValue: number = parseInt(initValue, 10);
    if (Number.isNaN(parsedValue)) return undefined;
    return parsedValue;
  }
  return undefined;
}

export async function times(n: number, fn: Function): Promise<void> {
  let success = false;
  let i = 0;
  while (!success && i < n) {
    i += 1;
    // eslint-disable-next-line no-await-in-loop
    await fn();
    try {
      success = true;
    } catch (error) {
      // Ignore error
    }
  }
}

/** Parse value if provided value is json string. If not string return same */
export function parseIfJson(val: any): object | undefined {
  try {
    if (typeof val === 'string') {
      return JSON.parse(val);
    }
    return val;
  } catch (error) {
    return undefined;
  }
}
