import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {map, Observable} from "rxjs";
import {PagedIndexModel} from "../_models";

export class PagedIndexMaterialTableDatasource<T> implements DataSource<T> {
  public total$: Observable<number> = this.pagedIndexModel$.pipe(
    map((response) => response.total)
  );

  constructor(protected pagedIndexModel$: Observable<PagedIndexModel<T>>) {}

  connect(collectionViewer: CollectionViewer): Observable<T[]> {
    return this.pagedIndexModel$.pipe(
      map((response) => response.objects.slice())
    );
  }

  disconnect(collectionViewer: CollectionViewer): void {}
}
