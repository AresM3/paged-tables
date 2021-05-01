import {ApiConfiguration, AuthService, ServiceWithConfig} from '@m3team/api-config';
import {BehaviorSubject, Observable} from 'rxjs';
import {DataSourceQuery} from './data-source-query';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export abstract class PagedCrudService<T> extends ServiceWithConfig {
    isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

    protected constructor(config: ApiConfiguration, http: HttpClient, authService: AuthService) {
        super(config, http, authService);
    }

    abstract index(query: DataSourceQuery): Observable<{ objects: T[], total: number }>;

    abstract show(id: number): Observable<T>;

    abstract create(obj: T): Observable<T>;

    abstract delete(obj: T): Observable<boolean>;

    abstract update(obj: T): Observable<T>;

    public static generateUrl(query: DataSourceQuery, prepend?: string): string {
        let url = !!prepend ? `${prepend}?` : '?';
        url += !!query.filter ? `filter=${query.filter}&` : '';
        url += !!query.sortColumn ? `sort_column=${query.sortColumn}&` : '';
        url += !!query.sortDirection ? `sort_direction=${query.sortDirection}&` : '';
        url += !!query.pageIndex ? `page_index=${query.pageIndex}&` : '';
        url += !!query.pageSize ? `page_size=${query.pageSize}` : '';
        return url;
    }
}
