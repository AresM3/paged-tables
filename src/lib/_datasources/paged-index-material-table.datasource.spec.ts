import { PagedIndexMaterialTableDatasource } from "./paged-index-material-table.datasource";
import { of, take } from "rxjs";

describe("PagedIndexMaterialTableDatasource", () => {
  let pagedIndexMaterialTableDatasource: PagedIndexMaterialTableDatasource<any>;

  beforeEach(() => {
    pagedIndexMaterialTableDatasource =
      new PagedIndexMaterialTableDatasource<any>(
        of({ total: 2, objects: [1, 2], page_index: 0, page_size: 10 })
      );
  });

  it("should show total members", (done: DoneFn) => {
    pagedIndexMaterialTableDatasource.total$
      .pipe(take(1))
      .subscribe({
        next: (total) => expect(total).toBe(2),
        complete: () => done(),
      });
  });
});
