import { TableSettingsModel } from "../_models";
import { ExpiringStorage } from "@aresm3/expiring-local-storage";
import { TablesSettings } from "../_types";

export class TableSettingsStorage {
  static get(tableName: string): TableSettingsModel {
    return TableSettingsStorage.getSettingsObject()[tableName] ?? null;
  }

  static set(tableName: string, settings: TableSettingsModel): void {
    TableSettingsStorage.setSettingsObject({
      ...TableSettingsStorage.getSettingsObject(),
      [tableName]: settings,
    });
  }

  private static getSettingsObject(): TablesSettings {
    return ExpiringStorage.getItem("table-storage") ?? {};
  }

  private static setSettingsObject(object: TablesSettings): void {
    ExpiringStorage.setItem("table-storage", object);
  }
}
