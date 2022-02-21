import {Observable} from "rxjs";
import {PagedIndexQueryModel} from "./_models/paged-index-query.model";

export interface ICrudService<T> {
    index(query?: PagedIndexQueryModel): Observable<T[]>;
    show(id: number): Observable<T>;
    create(obj: T): Observable<T>;
    delete(obj: T): Observable<boolean>;
    update(obj: T): Observable<T>;
}
