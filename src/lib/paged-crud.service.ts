import {Injectable} from '@angular/core';
import {AbstractPagedCrudService} from "./abstract-paged-crud.service";
import {Observable, throwError} from "rxjs";
import {DataSourceQuery} from "./data-source-query";
import {AxiosRequest} from "@m3team/axios-requests/lib/axios-requests";
import {catchError, finalize, first} from "rxjs/operators";
import {BaseModel} from "./_models/base.model";

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
        return AxiosRequest.delete<boolean>(this.DeletePath + `/${obj.id}`).pipe(
            first(a => !!a),
            catchError(err => this.error(err)),
            finalize(() => this.isLoadingSubject.next(false))
        );
    }

    protected readonly IndexPath: string;

    index(query: DataSourceQuery): Observable<{ objects: T[]; total: number }> {
        this.isLoadingSubject.next(true);
        let url = this.generateUrl(query, this.IndexPath);
        return AxiosRequest.get<{objects: T[], total: number}>(url).pipe(
            first(a => !!a),
            catchError(err => this.error(err)),
            finalize(() => this.isLoadingSubject.next(false))
        );
    }

    protected readonly ShowPath: string;

    show(id: number): Observable<T> {
        return AxiosRequest.get<T>(this.ShowPath + `/${id}`).pipe(
            first(a => !!a),
            catchError(err => this.error(err))
        );
    }

    protected readonly UpdatePath: string;

    update(obj: T): Observable<T> {
        this.isLoadingSubject.next(true);
        return AxiosRequest.put<T>(this.UpdatePath + `/${obj.id}`, obj).pipe(
            first(a => !!a),
            catchError(err => this.error(err)),
            finalize(() => this.isLoadingSubject.next(false))
        );
    }

    protected error(err: any){
        return throwError(err);
    }

    protected generateUrl(query: DataSourceQuery, prepend?: string): string {
        return PagedCrudService.generateUrl(query, prepend);
    }
}
