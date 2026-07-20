import { Routes } from '@angular/router';
import {ProductTableComponent} from "./northwind-ui/products/product-table/product-table.component";
import { StockInventoryComponent } from './northwind-ui/products/stock-inventory/stock-inventory.component';
import { DashComponent } from './northwind-ui/dash/dash.component';
import { ProductTableDetailComponent } from './northwind-ui/products/product-table/product-table-detail/product-table-detail.component';
import { LoginComponent } from './northwind-ui/login/login.component';
import { DashboardResolver } from './utilities/resolvers/dashboard-resolver.resolver';
import { CalculateGuard } from './utilities/guards/calculate.guard';
import { CalculatorComponent } from './northwind-ui/calculator/calculator.component';
import { EmployeesComponent } from './northwind-ui/employees/employees.component';
import{ TodoComponent } from './northwind-ui/todo/todo.component'
import { Error404Component } from './shared/error/error404/error404.component';
import { Error500Component } from './shared/error/error500/error500.component';

export const routes: Routes = [
    {path: '', component:LoginComponent},
    {path: 'dashboard',
    component:DashComponent, 
    resolve: { data: DashboardResolver }
    },
    {path:'calc', component:CalculatorComponent, 
        canActivate: [CalculateGuard],
    },
    {path:'404', component:Error404Component, 
        canActivate: [CalculateGuard],
    },
    {path:'500', component:Error500Component, 
        canActivate: [CalculateGuard],
    },        
    {path:'work', component:EmployeesComponent},
    {path: 'stock', component: StockInventoryComponent},
    {path: 'todo', component: TodoComponent},
    {path: 'products', component: ProductTableComponent,
        children: [
            {path: 'details/new', component: ProductTableDetailComponent},
            {path: 'details/:id', component: ProductTableDetailComponent},
        ]
    },

    { path: '**', redirectTo: 'dashboard' }
]
