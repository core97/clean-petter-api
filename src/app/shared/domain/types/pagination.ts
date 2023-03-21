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
