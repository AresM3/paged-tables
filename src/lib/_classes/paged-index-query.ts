import { PagedIndexQueryModel } from "../_models";

/**
 * @class PagedIndexQuery
 * @description Aiuta nell'utilizzo delle query delle paged tables
 */
export class PagedIndexQuery implements PagedIndexQueryModel {
  page_index?: number;
  page_size?: number;
  filter?: string;
  sort_column?: number;
  sort_direction?: string;

  constructor(query?: PagedIndexQueryModel) {
    if (!!query) Object.assign(this, query);
  }

  /**
   * Trasforma i parametri della query in un url già formattato corretamente
   * @param url
   */
  toUrl(url: string = ""): string {
    let params = new URLSearchParams(
      Object.entries(this).filter((entry) => !!entry[1] || entry[1] === 0)
    );
    return `${url}?${params.toString()}`;
  }

  /**
   * Applica il metodo toUrl su un semplice modello di PagedIndexQueryModel
   * @param query
   * @param url
   */
  public static queryToUrl(
    query: PagedIndexQueryModel,
    url: string = ""
  ): string {
    return new PagedIndexQuery(query).toUrl(url);
  }
}
