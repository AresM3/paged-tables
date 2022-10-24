import { DataSource } from "@angular/cdk/collections";
import { map, of, Subject, take } from "rxjs";
import { PagedIndexQueryModel, PagedIndexModel } from "../_models";
import { Indexable } from "../_services";
import { PagedIndexMaterialTableDatasource } from "./paged-index-material-table.datasource";

export class IndexableMaterialTableDatasource<T>
  extends PagedIndexMaterialTableDatasource<T>
  implements DataSource<T>
{
  protected pagedIndexModelSubject: Subject<PagedIndexModel<T>> = new Subject<
    PagedIndexModel<T>
  >();

  constructor(protected service: Indexable<T>) {
    super(of());
    this.pagedIndexModel$ = this.pagedIndexModelSubject.asObservable();
    this.total$ = this.pagedIndexModelSubject
      .asObservable()
      .pipe(map((response) => response.total));
  }

  /**
   * Carica i dati dal servizio secondo la query specificata come parametro
   * @param query
   */
  load(query: PagedIndexQueryModel): void {
    this.service
      .index(query)
      .pipe(take(1))
      .subscribe({
        next: (response) => this.pagedIndexModelSubject.next(response),
      });
  }
}
