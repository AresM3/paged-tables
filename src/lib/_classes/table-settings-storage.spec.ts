import {TableSettingsStorage} from "./table-settings-storage";
import {TableSettingsModel} from "../_models";

describe("TableSettingsStorage", () => {
  beforeEach(() => localStorage.clear());

  it("should write table settings", () => {
    const settings: TableSettingsModel = {
      sortColumn: "ares",
      sortDirection: "asc",
      pageIndex: 0,
      pageSize: 10,
    };
    localStorage.setItem("table-storage", "{}");
    TableSettingsStorage.set("table", settings);
    expect(TableSettingsStorage.get("table")).toEqual(settings);
  });
});
