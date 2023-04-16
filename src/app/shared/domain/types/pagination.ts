export interface PaginationParams {
  page: number;
  limit: number;
}

export type PaginationQueryParams = {
  page: string;
  limit: string;
};

export interface PaginationResult<T> {
  total: number;
  results: T[];
}

export const isVaidPaginationQueryParams = (
  pagination: any
): pagination is PaginationQueryParams =>
  (['limit', 'page'] as (keyof PaginationQueryParams)[]).every(
    key =>
      typeof pagination === 'object' &&
      key in pagination &&
      pagination[key] &&
      typeof pagination[key] === 'string' &&
      /^\d+$/.test(pagination[key])
  );
