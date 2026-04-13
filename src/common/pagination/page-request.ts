export interface PageRequest {
  page: number;
  pageSize: number;
  totalItems?: number;
  timestamp?: Date;
}

export interface PageResult<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalItems: number;
}
