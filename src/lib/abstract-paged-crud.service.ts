import {ApiConfiguration, AuthService, ServiceWithConfig} from '@m3team/api-config';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {PagedIndexQueryModel} from "./_models/paged-index-query.model";
import {PagedIndexModel} from "./_models/paged-index.model";

@Injectable()
export abstract class AbstractPagedCrudService<T> extends ServiceWithConfig {
    isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

    protected constructor(config: ApiConfiguration, http: HttpClient, authService: AuthService) {
        super(config, http, authService);
    }

    abstract index(query: PagedIndexQueryModel): Observable<PagedIndexModel<T>>;

    abstract show(id: number): Observable<T>;

    abstract create(obj: T): Observable<T>;

    abstract delete(obj: T): Observable<boolean>;

    abstract update(obj: T): Observable<T>;
}
