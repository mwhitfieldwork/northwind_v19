import { Routes } from '@angular/router';
import {ProductTableComponent} from "./northwind-ui/products/product-table/product-table.component";
import { StockInventoryComponent } from './northwind-ui/products/stock-inventory/stock-inventory.component';
import { DashComponent } from './northwind-ui/dash/dash.component';
import { ProductTableDetailComponent } from './northwind-ui/products/product-table/product-table-detail/product-table-detail.component';

export const routes: Routes = [
    {path: '', component:DashComponent },
    {path: 'dashboard', component:DashComponent },
    {path: 'stock', component: StockInventoryComponent},
    {path: 'products', component: ProductTableComponent,
        children: [
            {path: 'details/new', component: ProductTableDetailComponent, data: {isEdit: false}},
            {path: 'details/:id', component: ProductTableDetailComponent, data: {isEdit: true}},
        ]
    },
]
