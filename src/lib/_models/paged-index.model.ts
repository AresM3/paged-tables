export interface PagedIndexModel<T> {
    objects: T[];
    total: number;
    page_index: number;
    page_size: number;
}
