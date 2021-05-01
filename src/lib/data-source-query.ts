export interface DataSourceQuery {
    filter?: string,
    sortDirection?: string,
    sortColumn?: number,
    pageIndex?: number,
    pageSize?: number,
    relationships?: boolean,
    appends?: boolean
}
