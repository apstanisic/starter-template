import { Card, IconButton } from '@material-ui/core';
import { FirstPage, NavigateBefore, NavigateNext } from '@material-ui/icons';
import Link from 'next/link';
import React, { Fragment } from 'react';
import { PaginationData } from 'src/core/types';
import { cmsPagination } from '../../core/cms/generate-cms-pagination';
import { useRouter } from 'next/router';

/**
 * Pagination component. It only shows first, previous page and next page.
 * Pagination is framework agnostic. As long as metadata fullfils given interface
 * this component will work.
 */
export function Pagination(props: { meta?: PaginationData; data?: any[] }) {
  const router = useRouter();
  let meta: PaginationData;
  if (props.data) {
    meta = cmsPagination(props.data, router);
  } else if (props.meta) {
    meta = props.meta;
  } else {
    return null;
  }
  if (meta.isFirstPage && meta.isLastPage) return null;

  return (
    <div className="w-full my-1 flex justify-center">
      <Card className="flex justify-around m-2 w-64">
        {meta.isFirstPage ? (
          <div className="w-12 h-12" />
        ) : (
          <Fragment>
            <Link href={meta.firstUrl ?? '/'}>
              <IconButton className="w-6" onClick={() => window.scroll(0, 0)}>
                <FirstPage />
              </IconButton>
            </Link>
            <Link href={meta.previousUrl ?? '/'}>
              <IconButton
                className="w-12 center h-12 text-gray-800"
                onClick={() => window.scroll(0, 0)}
              >
                {/* <FontAwesomeIcon icon="chevron-left" /> */}
                <NavigateBefore />
              </IconButton>
            </Link>
          </Fragment>
        )}
        {/* <div className="flex-grow center h-12">{meta.page}</div> */}
        {meta.isLastPage ? (
          <div className="w-12 h-12" />
        ) : (
          <Link href={meta.nextUrl ?? '/'}>
            <IconButton
              className="w-12 center h-12 text-gray-800"
              onClick={() => window.scroll(0, 0)}
            >
              <NavigateNext />
            </IconButton>
          </Link>
        )}
      </Card>
    </div>
  );
}
