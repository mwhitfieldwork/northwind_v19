import { Component } from '@angular/core';
import { ProductTableComponent } from "../products/product-table/product-table.component";

@Component({
  selector: 'app-dash',
  standalone: true,
  imports: [ProductTableComponent],
  templateUrl: './dash.component.html',
  styleUrl: './dash.component.scss'
})
export class DashComponent {

}
