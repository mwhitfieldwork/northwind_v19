import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { OrderHistoryService } from '../../utilities/services/orders/order-history.service';
import { OrderDetails } from '../../utilities/models/order-detail';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [    
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    FormsModule
  ],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.scss'
})
export class OrderHistoryComponent implements AfterViewInit {

private _orderHistoryService = inject(OrderHistoryService)
orderList!:Subscription;
dataSource: MatTableDataSource<OrderDetails> = new MatTableDataSource();
selection = new SelectionModel<OrderDetails>(true, []);
orderHistory: OrderDetails[] = [];

@ViewChild(MatPaginator, {static: true})
paginator!: MatPaginator;

@ViewChild(MatSort, {static: true}) sort!: MatSort;
isLoading: boolean = false;


displayedColumns: string[] = [
   'select',
  'productName',
  'unitPrice',
  'quantity',
  'discount'
];

ngAfterViewInit(): void {
  this.orderList = this._orderHistoryService.get()
  .pipe(
    map(orders => {
      return orders.map((order, index) => ({
        ...order, 
        pkID: index + 1
      }));
    })
  )
  .subscribe((data) => {
    this.dataSource.data = data;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    //console.log(data);
  });
}

  ngonDestroy(): void {
    if(this.orderList) this.orderList.unsubscribe();
  }

  addToEmailList(order:OrderDetails){
    this.orderHistory.push(order);
    //console.log(this.orderHistory, "Order added to email");
  }

  removeFromEmailList(row:OrderDetails){
    const index = this.orderHistory.findIndex(item => item.pkID === row.pkID);
    if (index !== -1) {
        this.orderHistory.splice(index, 1);
    }
    //console.log(this.orderHistory, "Order removed to email");
  }

  onCheckboxChange(event: MatCheckboxChange, row: any): void {
    if (event.checked) {
        this.addToEmailList(row);
    } else {
        this.removeFromEmailList(row);
    }
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.dataSource.data.forEach(row => this.selection.select(row));
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

}
