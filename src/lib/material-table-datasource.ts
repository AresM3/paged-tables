import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable} from 'rxjs';
import {SortDirection} from '@angular/material/sort';
import {AbstractPagedCrudService} from "./abstract-paged-crud.service";

export class MaterialTableDataSource<T> implements DataSource<T> {
    protected listSubject: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
    protected totalSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    public total$: Observable<number> = this.totalSubject.asObservable();

    constructor(protected service: AbstractPagedCrudService<T>) {}

    connect(collectionViewer: CollectionViewer): Observable<T[]> {
        return this.listSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.listSubject.complete();
    }

    load(filter: string, sortDirection: SortDirection, sortColumn: number, pageIndex: number, pageSize: number): void {
        this.service.index({
            filter        : filter,
            sort_direction: sortDirection,
            sort_column   : sortColumn,
            page_index    : pageIndex,
            page_size     : pageSize,
        }).subscribe(val => {
            this.listSubject.next(val.objects.slice());
            this.totalSubject.next(val.total);
        });
    }
}
