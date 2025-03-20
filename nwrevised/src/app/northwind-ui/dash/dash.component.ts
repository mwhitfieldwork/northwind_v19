import { Component } from '@angular/core';
import { ProductTableComponent } from "../products/product-table/product-table.component";
import { EmployeesComponent } from "../employees/employees.component";
import { CardComponent } from "../../shared/card/card.component";

@Component({
  selector: 'app-dash',
  standalone: true,
  imports: [ProductTableComponent, EmployeesComponent, CardComponent],
  templateUrl: './dash.component.html',
  styleUrl: './dash.component.scss'
})
export class DashComponent {
  totalOrders:number = 0;
  averageOrderPrice:number = 0;

}
