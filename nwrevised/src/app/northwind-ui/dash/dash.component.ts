import { Component } from '@angular/core';
import { ProductTableComponent } from "../products/product-table/product-table.component";
import { EmployeesComponent } from "../employees/employees.component";

@Component({
  selector: 'app-dash',
  standalone: true,
  imports: [ProductTableComponent, EmployeesComponent],
  templateUrl: './dash.component.html',
  styleUrl: './dash.component.scss'
})
export class DashComponent {


}
