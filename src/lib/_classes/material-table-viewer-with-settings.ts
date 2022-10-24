import {MaterialTableViewer} from "./material-table-viewer";
import {TableSettingsStorage} from "./table-settings-storage";
import {TableSettingsModel} from "../_models";
import {MatSortable} from "@angular/material/sort";
import {Observable, Subscription, tap} from "rxjs";

export abstract class MaterialTableViewerWithSettings<T> extends MaterialTableViewer<T> {
  abstract tableName: string;

  defaultSettings: TableSettingsModel = {
    pageIndex    : 0,
    pageSize     : 10,
    sortColumn   : "id",
    sortDirection: "asc",
  };

  sortOrPaginationChange(): Observable<any> {
    return super.sortOrPaginationChange().pipe(tap(() => this.saveSettings()));
  }

  saveSettings() {
    TableSettingsStorage.set(this.tableName, {
      pageSize     : this.paginator.pageSize,
      pageIndex    : this.paginator.pageIndex,
      sortColumn   : this.sort.active,
      sortDirection: this.sort.direction,
    });
  }

  loadSettings() {
    const settings =
            TableSettingsStorage.get(this.tableName) ?? this.defaultSettings;
    this.sort?.sort(<MatSortable>{
      id          : settings.sortColumn,
      start       : settings.sortDirection,
      disableClear: false,
    });
    this.paginator.pageSize = settings.pageSize;
    this.paginator.pageIndex = settings.pageIndex;
  }

  override setupListeners(): Subscription[] {
    this.loadSettings();
    return super.setupListeners();
  }

  load(): void {}
}
