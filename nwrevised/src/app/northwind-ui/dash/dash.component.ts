import { Component } from '@angular/core';
import { EmployeesComponent } from "../employees/employees.component";
import { MatCardModule } from '@angular/material/card';
import { StockInventoryComponent } from "../products/stock-inventory/stock-inventory.component";

@Component({
  selector: 'app-dash',
  standalone: true,
  imports: [ EmployeesComponent, MatCardModule, StockInventoryComponent],
  templateUrl: './dash.component.html',
  styleUrl: './dash.component.scss'
})
export class DashComponent {
  totalOrders:number = 0;
  averageOrderPrice:number = 0;

}

