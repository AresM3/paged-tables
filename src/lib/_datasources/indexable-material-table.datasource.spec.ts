import {IndexableMaterialTableDatasource} from "./indexable-material-table.datasource";
import {Indexable} from "../_services";
import {PagedIndexModel, PagedIndexQueryModel} from "../_models";
import {Observable, of, take} from "rxjs";

describe("IndexableMaterialTableDatasource", () => {
  let indexableMaterialTableDatasource: IndexableMaterialTableDatasource<any>;

  beforeEach(() => {
    const service = new (class implements Indexable<any> {
      index(query?: PagedIndexQueryModel): Observable<PagedIndexModel<any>> {
        return of({ total: 2, objects: [1, 2], page_index: 0, page_size: 10 });
      }
    })();
    indexableMaterialTableDatasource =
      new IndexableMaterialTableDatasource<any>(service);
  });

  it("should show total members", (done: DoneFn) => {
    indexableMaterialTableDatasource.total$
      .pipe(take(1))
      .subscribe({
        next: (total) => expect(total).toBe(2),
        complete: () => done(),
      });
    indexableMaterialTableDatasource.load({});
  });
});
