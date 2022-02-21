import {PagedIndexQueryModel} from "../_models/paged-index-query.model";

export class PagedIndexQuery implements PagedIndexQueryModel {
    page_index?: number;
    page_size?: number;
    filter?: string;
    sort_column?: number;
    sort_direction?: string;

    constructor(query?: PagedIndexQueryModel) {
        if (!!query) Object.assign(this, query);
    }

    toUrl(url: string = ''): string {
        let params = new URLSearchParams(Object.entries(this));
        return `${url}?${params.toString()}`;
    }

    public static queryToUrl(query: PagedIndexQueryModel, url: string = ''): string {
        return new PagedIndexQuery(query).toUrl(url);
    }
}
