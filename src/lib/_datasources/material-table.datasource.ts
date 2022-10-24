import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable } from "rxjs";

/**
 * @class MaterialTableDatasource
 * @description Si utilizza come sorgente dei dati per una tabella Material
 */
export class MaterialTableDatasource<T> implements DataSource<T> {
  constructor(protected observable: Observable<T[]>) {}

  /**
   * Connette i subject
   * @param collectionViewer
   */
  connect(collectionViewer: CollectionViewer): Observable<T[]> {
    return this.observable;
  }

  /**
   * Disconnette i subject al momento della disconnessione del datasource
   * @param collectionViewer
   */
  disconnect(collectionViewer: CollectionViewer): void {}
}
