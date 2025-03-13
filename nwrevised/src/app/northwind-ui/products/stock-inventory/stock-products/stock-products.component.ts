import { Component, Input, OnInit, Output, EventEmitter, computed, input } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'stock-products',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './stock-products.component.html',
  styleUrl: './stock-products.component.scss'
})
export class StockProductsComponent implements OnInit{
  parent = input<FormGroup>(new FormGroup({})); 
  @Output() removed = new EventEmitter<any>();
  stocks = computed(() => (this.parent().get('stock') as FormArray).controls);

  ngOnInit(): void {
    console.log(this.stocks)
  }

  onRemove(group:any, index:number){
    this.removed.emit({group, index})
  }
  

}
