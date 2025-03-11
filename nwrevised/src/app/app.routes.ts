import { Routes } from '@angular/router';
import {ProductTableComponent} from "./northwind-ui/products/product-table/product-table.component";
import { StockInventoryComponent } from './northwind-ui/products/stock-inventory/stock-inventory.component';

export const routes: Routes = [
    {path: '', component: ProductTableComponent},
    {path: 'stock', component: StockInventoryComponent},
]
