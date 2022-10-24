import { MaterialTableDatasource } from "./material-table.datasource";
import { of } from "rxjs";

describe("MaterialTableDatasource", () => {
  let materialTableDatasource: MaterialTableDatasource<any>;

  beforeEach(() => {
    materialTableDatasource = new MaterialTableDatasource<any>(of([1, 2, 3]));
  });

  it("should exist", () => {
    expect(materialTableDatasource).toBeTruthy();
  });
});
