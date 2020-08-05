import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/state/store';
import useSWR, { responseInterface } from 'swr';
import { cms } from './cms/cms';
import { toCmsQuery } from './cms/to-cms-query';
import { cmsPagination } from './cms/generate-cms-pagination';
import { http } from './http';
import { PaginationData, PaginationResult } from './types';
import { queryToString } from './utils/query-to-string';
import { QueryParams } from '@directus/sdk-js/dist/types/schemes/http/Query';

/** Options for useGetMany */
interface Options<T> {
  /** Object for filtering data */
  filter?: Record<string, any>;
  /** Redux action that handles data */
  store?: (data: T) => any;
  /** Should data be fetched from rest api or cms */
  source: 'rest' | 'cms';
  /** If a data is already fetched (for example on server) */
  initialData?: T;
  /** If data is already fetched on server, and pagination info already exist */
  initialPg?: PaginationData;
}

/**
 * cmsGetMany response object.
 * It's almost the same as a useSWR object, except it provides pagination
 */
interface GetManyRes<T = any> extends responseInterface<T[], any> {
  pg?: PaginationData;
}

/** Fetch many entities from cms (basic method without hooks) */
export function getManyCms<Entity = any>(
  col: string,
  { filter, params }: { filter?: Record<string, any>; params?: QueryParams },
): Promise<Entity[]> {
  // Limit is biger for one, so when we fetch one more, we know there is next page
  const limit = +(filter?.limit ?? 12) + 1;
  const offset = +(filter?.offset ?? 0);

  return cms
    .getItems<Entity[]>(col, {
      limit,
      offset,
      ...params,
      filter: toCmsQuery(filter),
    })
    .then((val) => val.data);
}

/** Fetch many entities from rest api (basic method without hooks) */
export function getManyRest<T = any>(
  col: string,
  options?: { filter?: Record<string, any> },
): Promise<PaginationResult<T>> {
  return http
    .get<PaginationResult<T>>(queryToString(options?.filter ?? {}, { pathname: col }))
    .then((r) => r.data);
}

/**
 * Hook that is wrapper around getManyCms and getManyRest
 * Used for fetching data for a client
 */
export function useGetMany<Entity = any>(
  col: string,
  options: Options<Entity[]>,
): GetManyRes<Entity> {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  // If there is initial data there should be initialPg, if data if fetched on server
  // There should be already some pagination.
  const [pg, setPg] = useState<PaginationData | undefined>(options.initialPg);

  const swr: GetManyRes<Entity> = useSWR(
    router.asPath,
    async () => {
      // If source is cmd
      if (options.source === 'cms') {
        const data = await getManyCms(col, { filter: options.filter });
        // Generate pagination for cms
        setPg(cmsPagination(data, router));
        return data;
      } else {
        const res = await getManyRest(col, { filter: options.filter });
        setPg(res.pagination);
        return res.data;
      }
    },
    // Don't request if there is prefetched data
    { initialData: options.initialData },
  );

  // Return pagination with swr object
  swr.pg = pg;

  // Handler if user wants to store data in redux store.
  // This effect will automatically dispatch returned value
  useEffect(() => {
    if (options?.store && swr.data) {
      dispatch(options.store(swr.data));
    }
  }, [dispatch, options, swr.data]);

  return swr;
}
