/**
 * @interface PagedIndexModel
 * @description La risposta di un metodo index in un servizio di paged table
 */
export interface PagedIndexModel<T> {
  objects: T[];
  total: number;
  page_index: number;
  page_size: number;
}
