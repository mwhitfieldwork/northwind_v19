import { Component, Input, OnChanges } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-basic-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    CommonModule
  ],
  templateUrl: './basic-table.component.html',
  styleUrl: './basic-table.component.scss'
})
export class BasicTableComponent  implements OnChanges {
  @Input() dataSource = new MatTableDataSource();
  @Input() displayedColumns: { columnDef: string, header: string }[] = [];
  columnKeys: string[] = [];

  ngOnChanges(): void {
    // Extract columnDef values for use in table bindings
    this.columnKeys = this.displayedColumns.map(column => column.columnDef);
  }

}
