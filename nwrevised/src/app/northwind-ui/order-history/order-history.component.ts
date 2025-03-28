import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderHistoryService } from '../../utilities/services/orders/order-history.service';
import { OrderDetails } from '../../utilities/models/order-detail';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [    
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.scss'
})
export class OrderHistoryComponent implements AfterViewInit {

private _orderHistoryService = inject(OrderHistoryService)
orderList!:Subscription;
dataSource: MatTableDataSource<OrderDetails> = new MatTableDataSource();

@ViewChild(MatPaginator, {static: true})
paginator!: MatPaginator;

@ViewChild(MatSort, {static: true}) sort!: MatSort;
isLoading: boolean = false;


displayedColumns: string[] = [
  'productId',
  'unitPrice',
  'quantity',
  'discount',
];

ngAfterViewInit(): void {
  this.orderList = this._orderHistoryService.get().subscribe((data) => {
    this.dataSource.data = data;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  });
}

  ngonDestroy(): void {
    if(this.orderList) this.orderList.unsubscribe();
  }

}
