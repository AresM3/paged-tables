/**
 * @interface PagedIndexQueryModel
 * @description I parametri base di una query per le paged tables
 */
export interface PagedIndexQueryModel {
  page_index?: number;
  page_size?: number;
  filter?: string;
  sort_column?: any;
  sort_direction?: string;
  [p: string]: any;
}
