import {AfterViewInit, Injectable, ViewChild} from '@angular/core';
import {MaterialTableDataSource} from './material-table-datasource';
import {merge, Observable} from 'rxjs';
import {MatTable} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {tap} from 'rxjs/operators';
import {AbstractPagedCrudService} from "./abstract-paged-crud.service";

@Injectable()
export abstract class MaterialTableComponent<T> implements AfterViewInit {
    dataSource: MaterialTableDataSource<T>;
    isLoading$: Observable<boolean>;
    displayedColumns: string[];
    filterValue: string = '';
    relationships: boolean = false;
    appends: boolean = false;

    @ViewChild(MatTable) table: MatTable<T>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    protected constructor(protected service: AbstractPagedCrudService<T>) {
        this.isLoading$ = this.service.isLoading$;
        this.dataSource = new MaterialTableDataSource<T>(service, this.relationships, this.appends);
    }

    ngAfterViewInit() {
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        merge<any>(this.sort.sortChange, this.paginator.page).pipe(tap(() => this.load())).subscribe();
    }

    abstract get column(): number;

    load(){
        this.dataSource.load(this.filterValue, this.sort.direction, this.column, this.paginator.pageIndex, this.paginator.pageSize);
    }

    abstract openCreateDialog();
    abstract openEditDialog(t: T);
    abstract openDeleteDialog(t: T);
}
