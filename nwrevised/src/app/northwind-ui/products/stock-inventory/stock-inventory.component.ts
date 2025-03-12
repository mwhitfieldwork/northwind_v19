import { Component } from '@angular/core';
import { FormControl, FormGroup, FormArray, ReactiveFormsModule, FormBuilder} from '@angular/forms';
import { StockBranchComponent } from "./stock-branch/stock-branch.component";
import {StockSelectorComponent} from "./stock-selector/stock-selector.component"
import { StockProductsComponent } from "./stock-products/stock-products.component";
import { JsonPipe } from '@angular/common';
import {ProductModel} from "../../../utilities/models/product"

@Component({
  selector: 'app-stock-inventory',
  standalone: true,
  imports: [ReactiveFormsModule, 
    StockBranchComponent, 
    StockSelectorComponent, 
    StockProductsComponent,
    JsonPipe ],
  templateUrl: './stock-inventory.component.html',
  styleUrl: './stock-inventory.component.scss'
})

//Creating a small feature that allows product to be ordered
export class StockInventoryComponent {
  products: ProductModel[] =[
    {categoryId:2,
      unitPrice: 20,
      productName:"test"
    },
    {categoryId:3,
      unitPrice: 120,
      productName:"test two"
    },
    {categoryId:4,
      unitPrice: 230,
      productName:"test three"
    },
  ]

  form!: FormGroup; // Declare form without initializing immediately

  constructor(private fb: FormBuilder) { // fb is now available
    this.form = this.fb.group({
      store: this.fb.group({
        branch: '',
        code: '',
      }),
      selector: this.fb.group({
        product_id: '',
        quantity: 10
      }),
      stock: this.fb.array([ // Corrected to use this.fb.array
        this.createStock({ product_id: 1, quantity: 60 }),
        this.createStock({ product_id: 3, quantity: 30 })
      ])
    });
  }

  createStock(stockItem: { product_id: number; quantity: number }) {
    return this.fb.group({ // Use fb.group instead of new FormGroup()
      product_id: this.fb.control(stockItem.product_id),
      quantity: this.fb.control(stockItem.quantity)
    });
  }

  
  addStock(value:any){
    console.log(value, 'Value')
    const control = this.form.get('stock') as FormArray;
    control.push(this.createStock(value));
  }

  removeStock({group,index}:{group:FormGroup,index:number}){
    const control = this.form.get('stock') as FormArray;
    control.removeAt(index);
    console.log(group, index) 
  }
  onSubmit(){
    console.log('Submit', this.form.value)
  }

  /* --Longhand way
  form = new FormGroup({
    store: new FormGroup({ //passed down to the stock branch component
      branch: new FormControl('B182'),
      code: new FormControl('1234'),
    }),
    selector: new FormGroup({ //passed to the selector component
      product_id: new FormControl(),
      quantity: new FormControl(10)
    }),
    stock: new FormArray([
      this.createStock({product_id:1, quantity:60}),
      this.createStock({product_id:3, quantity:30})
    ])//collection of form controls and form groups to be passed to stock-products
  })
 
  createStock(stock:any){
    return new FormGroup({ //passed to the selector component
      product_id: new FormControl(stock.product_id || ''),
      quantity: new FormControl(stock.quantity || 10)
    })
  }
  --*/
}
