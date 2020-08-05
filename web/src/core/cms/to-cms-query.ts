import { removeEmptyItems } from '../utils/helpers';
/**
 * Get proper filter for provided query in directus cms
 * from {numb__lte: 44}
 * to {numb: {lte: 44}}
 * @param query
 */
export function toCmsQuery(rawQuery: Record<string, any> = {}): Record<string, any> {
  const query: Record<string, any> = {};
  Object.entries(removeEmptyItems(rawQuery)).forEach(([key, val]) => {
    // eslint-disable-next-line prefer-const
    let [name, operator] = key.split('__');
    if (name === 'offset' || name === 'limit') return;
    if (operator === undefined) operator = 'eq';
    query[name] = { [operator]: val };
  });
  return query;
}
