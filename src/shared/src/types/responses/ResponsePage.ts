export interface ResponsePage<T> {
  elements: T[];
  pageNumber: number;
  pageSize: number;
}
