import { Routes } from '@angular/router';
import {ProductTableComponent} from "./northwind-ui/products/product-table/product-table.component";
import { StockInventoryComponent } from './northwind-ui/products/stock-inventory/stock-inventory.component';
import { DashboardComponent } from './northwind-ui/dashboard/dashboard.component';

export const routes: Routes = [
    {path: '', component:DashboardComponent },
    {path: 'dashboard', component:DashboardComponent },
    {path: 'stock', component: StockInventoryComponent},
    {path: 'products', component: ProductTableComponent},
]
