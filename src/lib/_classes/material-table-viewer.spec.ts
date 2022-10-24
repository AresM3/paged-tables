import {MaterialTableViewer} from "./material-table-viewer";
import {MatSort} from "@angular/material/sort";
import {MatTable} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Indexable} from "../_services";
import {PagedIndexModel, PagedIndexQueryModel} from "../_models";
import {Observable, of} from "rxjs";
import {IndexableMaterialTableDatasource} from "../_datasources";

describe("Material Table Viewer", () => {
  let viewer: MaterialTableViewer<any>;

  beforeEach(() => {
    viewer = new class extends MaterialTableViewer<any> {
      service = new (class implements Indexable<any> {
        index(query?: PagedIndexQueryModel): Observable<PagedIndexModel<any>> {
          return of({
            total     : 2,
            objects   : [1, 2],
            page_index: 0,
            page_size : 10,
          });
        }
      })();
      dataSource: IndexableMaterialTableDatasource<any> =
        new IndexableMaterialTableDatasource<any>(this.service);
      displayedColumns: string[] = ["column1", "column2", "column3"];
      filterValue: string = "";
      paginator: MatPaginator;
      sort: MatSort;
      table: MatTable<any>;

      load(): void {
        this.dataSource.load({});
      }
    }();
  });

  it("should call load on the datasource", () => {
    const spyOnDatasource = spyOn(viewer["dataSource"], "load");
    viewer.load();
    expect(spyOnDatasource).toHaveBeenCalled();
  });
});
