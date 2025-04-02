import { Component, computed, inject, OnInit } from '@angular/core';
import { EmployeesComponent } from "../employees/employees.component";
import { MatCardModule } from '@angular/material/card';
import { StockInventoryComponent } from "../products/stock-inventory/stock-inventory.component";
import { Chart1Component } from "./chart-1/chart-1.component";
import { OrderHistoryComponent } from "../order-history/order-history.component";
import { UserSessionService } from '../../utilities/services/user-session/user-session.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-dash',
  standalone: true,
  imports: [EmployeesComponent, MatCardModule, StockInventoryComponent, Chart1Component, OrderHistoryComponent],
  templateUrl: './dash.component.html',
  styleUrl: './dash.component.scss'
})
export class DashComponent implements OnInit {
  totalOrders:number = 12873;
  averageOrderPrice:number = 5433.32;
  averageTicketPrice:number = 708.12;
  backpackAverage:number = 1234.09;
  private  _userSessionService = inject(UserSessionService);
  data: any;
  isLoading = true;


  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Access resolved data
    this.data = this.route.snapshot.data['data'].dataFromService1;

    // Set loading to false once data is ready
    this.isLoading = false;

    console.log(this.data); // Logs the resolved data
  }


}

