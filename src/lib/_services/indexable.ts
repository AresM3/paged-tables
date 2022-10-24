import {Observable} from "rxjs";
import {PagedIndexModel, PagedIndexQueryModel} from "../_models";

export interface Indexable<T> {
  index(query?: PagedIndexQueryModel): Observable<PagedIndexModel<T>>;
}
