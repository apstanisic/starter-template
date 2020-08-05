/**
 * All info from pagination
 */
export interface PaginationData {
  amount: number;
  perPage: number;
  isFirstPage: boolean;
  isLastPage: boolean;
  // lastUrl?: string;
  firstUrl?: string | null;
  nextUrl?: string | null;
  previousUrl?: string | null;
}

/**
 * Pagination response
 */
export interface PaginationResult<T = any> {
  pagination: PaginationData;
  data: T[];
}
