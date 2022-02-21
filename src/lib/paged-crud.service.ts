import {Injectable} from '@angular/core';
import {AbstractPagedCrudService} from "./abstract-paged-crud.service";
import {Observable, throwError} from "rxjs";
import {AxiosRequest} from "@m3team/axios-requests/lib/axios-requests";
import {catchError, finalize, first} from "rxjs/operators";
import {BaseModel} from "./_models/base.model";
import {PagedIndexQuery} from "./_classes/paged-index-query";
import {PagedIndexModel} from "./_models/paged-index.model";

@Injectable()
export class PagedCrudService<T extends BaseModel> extends AbstractPagedCrudService<T> {

    protected readonly CreatePath: string;

    create(obj: T): Observable<T> {
        this.isLoadingSubject.next(true);
        return AxiosRequest.post<T>(this.CreatePath, obj).pipe(
            first(a => !!a),
            catchError(err => this.error(err)),
            finalize(() => this.isLoadingSubject.next(false))
        );
    }

    protected readonly DeletePath: string;

    delete(obj: T): Observable<boolean> {
        this.isLoadingSubject.next(true);
        return AxiosRequest.delete<boolean>(`${this.DeletePath}/${obj.id}`).pipe(
            first(a => !!a),
            catchError(err => this.error(err)),
            finalize(() => this.isLoadingSubject.next(false))
        );
    }

    protected readonly IndexPath: string;

    index(query: PagedIndexQuery): Observable<PagedIndexModel<T>> {
        this.isLoadingSubject.next(true);
        return AxiosRequest.get<PagedIndexModel<T>>(PagedIndexQuery.queryToUrl(query, this.IndexPath)).pipe(
            first(a => !!a),
            catchError(err => this.error(err)),
            finalize(() => this.isLoadingSubject.next(false))
        );
    }

    protected readonly ShowPath: string;

    show(id: number): Observable<T> {
        return AxiosRequest.get<T>(`${this.ShowPath}/${id}`).pipe(
            first(a => !!a),
            catchError(err => this.error(err))
        );
    }

    protected readonly UpdatePath: string;

    update(obj: T): Observable<T> {
        this.isLoadingSubject.next(true);
        return AxiosRequest.put<T>(`${this.UpdatePath}/${obj.id}`, obj).pipe(
            first(a => !!a),
            catchError(err => this.error(err)),
            finalize(() => this.isLoadingSubject.next(false))
        );
    }

    protected error(err: any) {
        return throwError(err);
    }
}
