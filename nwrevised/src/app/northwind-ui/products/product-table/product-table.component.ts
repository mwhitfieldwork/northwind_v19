import { Component, OnInit, ViewChild, Inject, AfterViewInit, inject, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Product } from './models/products';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog'
import {FormGroup, FormControl, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray, ReactiveFormsModule, FormsModule} from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, take } from 'rxjs/operators';
import { ProductsService } from '../../../utilities/services/product-table/products.service';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.scss',
  standalone: true,
  providers: [
    ProductsService
  ],
  imports: [   
    FormsModule,
    /*MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule,*/
  ]
})
export class ProductTableComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;
 

  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  displayedColumns: string[] = [
    'displayName',
    'quantity',
    'price',
    'discontinued',
    'rating',
    'edit',
    'delete'
  ];

  products: Product[] = [];
  dataSource: MatTableDataSource<Product> = new MatTableDataSource();
  errorMessage:any;
  productID!:number;
  stars:string[] = [];
  index!:number
  starList:any[]  = [];
  productsList!:Subscription;

  constructor(private _productsService: ProductsService, private router:Router) { }

  ngOnInit(): void {
    this.productsList = this._productsService.getProducts().subscribe(
      (response) => {
        this.products = response
      }
    );
  }

  ngOnDestroy(): void {
    if(this.productsList) this.productsList.unsubscribe();
  }

  ngAfterViewInit(): void {
   /* this.products$.subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    */
  }

  getProducts(): Observable<Product[]> {
    return this._productsService.getProducts().pipe(
      map(products => products),
    );
  }
  
/*
  deleteProduct(product:Product){
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '450px',
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
          this.getProducts();
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: this.products$
    });

    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = 500;
    dialogConfig.maxHeight = 500;

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed test');
    });
  }
*/

  addRating(products:Product[]):void {
  }

  deleteProduct(id:number){
    console.log(id);
  }
}



