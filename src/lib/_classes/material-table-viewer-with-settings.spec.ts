import { MaterialTableViewerWithSettings } from './material-table-viewer-with-settings';
import { MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { PagedIndexMaterialTableDatasource } from '../_datasources';
import { of } from 'rxjs';

describe('MaterialTableViewerWithSettings', () => {
  let viewer: MaterialTableViewerWithSettings<any>;

  beforeEach(() => {
    viewer = new class extends MaterialTableViewerWithSettings<any> {
      displayedColumns: string[];
      filterValue: string;
      paginator: MatPaginator;
      sort: MatSort;
      table: MatTable<any>;
      tableName: string;
      datasource: PagedIndexMaterialTableDatasource<any> = new PagedIndexMaterialTableDatasource<any>(of({
        objects   : [1, 2, 3, 4],
        page_index: 0,
        page_size : 10,
        total     : 4,
      }));
    };
  });
});
