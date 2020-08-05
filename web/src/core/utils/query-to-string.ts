import queryString from 'query-string';
import { removeEmptyItems } from './helpers';

interface Options {
  pathname?: string;
}

/**
 * Generate string for provided page. Remove empty values
 */
export function queryToString(query: Record<string, any>, options?: Options) {
  const pathname = options?.pathname ?? '';
  const parsed = queryString.stringify(removeEmptyItems(query));

  // If there is pathname there must be question mark added
  if (pathname.length > 0) {
    return pathname + '?' + parsed;
  } else {
    return parsed;
  }
}
