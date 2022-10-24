import { SortDirection } from "@angular/material/sort";

export interface TableSettingsModel {
  pageSize: number;
  pageIndex: number;
  sortColumn: any;
  sortDirection: SortDirection;
}
