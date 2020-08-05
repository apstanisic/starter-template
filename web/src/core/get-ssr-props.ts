import { QueryParams } from '@directus/sdk-js/dist/types/schemes/http/Query';
import { GetServerSideProps } from 'next';
import { PaginationData } from './types';
import { getManyCms, getManyRest } from './use-get-many';
import { getOne } from './use-get-one';

/** Props for get one */
export interface GetOneSsrProps<Entity, Params = any, HookData = any> {
  initialData?: Entity;
  params: Params;
  source: 'cms' | 'rest';
  hookData?: HookData;
}

/** Props for get many */
export interface GetManySsrProps<Entity> {
  initialData: Entity[];
  source: 'cms' | 'rest';
  pg?: PaginationData;
}

// If we want to dynamicly generate filter by geting query
type FilterFunc = (query: Record<string, any>) => Record<string, any>;

/**
 * Get many items for server side rendering.
 * This function is called on getServerSideProps.
 * It will take params and fetch them
 * Returns a function that NextJS will call when rendering page
 * @params filter If you want to replace filter from url
 * pass this param, it can be record, or function
 * For function first param will be url query.
 * Returned object will be new filter
 */
export function getManySsr<Entity>({
  col,
  source,
  filter,
  params,
}: {
  col: string;
  source: 'cms' | 'rest';
  filter?: Record<string, any> | FilterFunc;
  params?: QueryParams;
}): GetServerSideProps<GetManySsrProps<Entity>> {
  return async ({ query }): Promise<any> => {
    // If function call it and get filter, othervise use
    // first provided filter, if nothing is provided use from url query.
    let parsedFilter: undefined | Record<string, any>;
    if (typeof filter !== 'function') {
      parsedFilter = filter ?? query;
    } else {
      parsedFilter = filter(query);
    }

    // const pathname = req.url as string;
    // If error is thrown return response without data
    try {
      // There must be split here because cms and rest api differently get pagination
      // Rest is generated on api server, and cms must be generated on client
      if (source === 'cms') {
        // If cms
        const initialData = await getManyCms<Entity>(col, { filter: parsedFilter, params });
        // const pg = cmsPagination(initialData, { query, pathname });
        return { props: { initialData, source } };
      } else {
        // If rest api
        const response = await getManyRest<Entity>(col, { filter: parsedFilter });
        return { props: { initialData: response.data, pg: response.pagination, source } };
      }
    } catch (error) {
      // Log error in terminal, and return empty array
      console.log('get-ssr-props error');
      console.log(error);
      return { props: { source, initialData: [] } };
    }
  };
}

/**
 * Get item by id for server side rendering.
 * This function will get item from selected source, and
 * provide them as a params to page component.
 * To be used for getServerSideProps
 * Returns a function that NextJS will call when rendering page
 */
export function getOneSsr<Entity extends any = any>({
  col,
  source,
  postHook,
}: {
  col: string;
  source: 'cms' | 'rest';
  postHook?: (params: Entity) => Promise<any>;
}): GetServerSideProps<GetOneSsrProps<Entity>> {
  return async (context): Promise<any> => {
    // Return empty response. Initial data will be undefined
    const response: { props: GetOneSsrProps<any, any, any> } = {
      props: { source, params: context.params },
    };
    try {
      const id = context.params?.id as string;
      const initialData = await getOne<Entity>(col, id, { source });
      response.props.initialData = initialData;
      if (postHook) {
        const hookData = await postHook(initialData);
        response.props.hookData = hookData;
      }
    } catch (e) {
      // Ignore error
    }
    return response;
  };
}
