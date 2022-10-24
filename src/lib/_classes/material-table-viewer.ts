import {MatTable} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {filter, merge, Observable, Subscription, tap} from "rxjs";

export abstract class MaterialTableViewer<T> {
  abstract displayedColumns: string[];
  abstract filterValue: string;

  abstract table: MatTable<T>;
  abstract paginator: MatPaginator;
  abstract sort: MatSort;

  sortChange(): Observable<any> {
    return this.sort?.sortChange.pipe(
      filter(() => !!this.paginator),
      tap(() => (this.paginator!.pageIndex = 0))
    );
  }

  sortOrPaginationChange(): Observable<any> {
    return merge(this.sort?.sortChange, this.paginator?.page).pipe(
      tap(() => this.load())
    );
  }

  setupListeners(): Subscription[] {
    return [
      this.sortChange().subscribe(),
      this.sortOrPaginationChange().subscribe(),
    ];
  }

  abstract load(): void;
}
