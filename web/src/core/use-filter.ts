import { useRouter } from 'next/router';
import { queryToString } from './utils/query-to-string';

/**
 * Helper to reduce boilerplate when filtering
 * Provide values and it will change current url for different query.
 * You can provide custom page as second param.
 */
export function useFilter() {
  const router = useRouter();

  return <T>(values: T, pathname?: string) =>
    router.push(queryToString(values, { pathname: pathname ?? router.pathname }));
}
