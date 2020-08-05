/* eslint-disable @typescript-eslint/ban-types */
import { useRouter } from 'next/router';
import useSWR, { responseInterface } from 'swr';
import { cms } from './cms/cms';
import { http } from './http';

/**
 * Fetch entity from REST api by ID
 */
function getRestById<Entity extends object = any>(
  col: string,
  id: string | number,
): Promise<Entity> {
  return http.get<Entity>(col + '/' + id).then((res) => res.data);
}

/**
 * Fetch entity from CMS api by ID
 */
function getCmsById<Entity extends object = any>(
  col: string,
  id: string | number,
): Promise<Entity> {
  return cms.getItem<Entity>(col, id).then((res) => res.data);
}

/**
 * Wrapper around fetching by ID from CMS or REST
 */
export function getOne<Entity extends object = any>(
  col: string,
  id: string | number,
  options: { source: 'rest' | 'cms' },
): Promise<Entity> {
  return options.source === 'cms' ? getCmsById(col, id) : getRestById(col, id);
}

/**
 * Hook to get one item from REST or CMS.
 * @param options.redirect Redirect if response throws an error.
 * @param options.initialData Data already fetched from server, if exist
 */
export function useGetOne<T extends object = object>(
  col: string,
  id: string | number,
  options: {
    redirect?: string;
    initialData?: any;
    source: 'rest' | 'cms';
  },
): responseInterface<T, any> {
  const router = useRouter();

  // router.asPath is used for caching
  const response = useSWR<T>(router.asPath, () => getOne(col, id, { source: options.source }), {
    initialData: options?.initialData,
  });

  // Redirect if returns error, and we want to redirect
  if (response.error && options?.redirect) {
    router.push(options.redirect);
  }

  return response;
}
