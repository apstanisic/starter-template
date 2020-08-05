import { PaginationData } from '../types';
import { queryToString } from '../utils/query-to-string';
/**
 * This function generates pagination object that conforms to
 * rest api interface. This enables pages to not worry about
 * how to display pagination
 */
export function cmsPagination<T = any>(
  fetchedData: T[] | undefined,
  router: { query: Record<string, any>; pathname: string },
): PaginationData {
  const { query, pathname } = router;
  const data = fetchedData ?? [];

  const limit = +(query.limit ?? 12);
  // const toFetch = limit + 1;
  // Is currently last page
  const isLastPage = data.length <= limit;
  // We are fetching one item more, so we know we are on the last page
  // Remove excess element if it's not last page
  if (data.length > limit) {
    data.pop();
  }
  // Is currently first page
  const isFirstPage = query.offset === undefined || +query.offset === 0;
  // First url, just remove offset
  const firstUrl = queryToString({ ...query, offset: undefined }, { pathname });
  // Next url. If it's not last page increase offset equal to one page
  let nextUrl: string | null = null;
  if (!isLastPage) {
    const updatedQuery = { ...query, offset: +(query.offset ?? 0) + limit };
    nextUrl = queryToString(updatedQuery, { pathname });
  }
  // Previous url. If page is not last, remove offset equal to one page,
  // if offset is less then 0, set offset to 0, othervise use offset
  let previousUrl: string | null = null;
  if (!isFirstPage) {
    // Generate previous url
    let backOffset = +query.offset - limit;
    if (backOffset < 0) backOffset = 0;
    const updatedQuery = { ...query, offset: backOffset };
    previousUrl = queryToString(updatedQuery, { pathname });
  }

  return {
    isLastPage,
    isFirstPage,
    previousUrl,
    nextUrl,
    firstUrl,
    amount: data.length,
    perPage: limit,
  };
}
