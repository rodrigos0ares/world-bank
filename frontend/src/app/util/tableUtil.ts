import {MatTableDataSource} from '@angular/material/table';

export const asDataSource = (list: any[]): MatTableDataSource<any> => {
  return new MatTableDataSource<any>(list);
};
