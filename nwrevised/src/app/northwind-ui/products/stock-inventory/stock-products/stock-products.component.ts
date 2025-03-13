import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'stock-products',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './stock-products.component.html',
  styleUrl: './stock-products.component.scss'
})
export class StockProductsComponent implements OnInit{
  @Input() parent!: FormGroup //switch to signal
  @Output() removed = new EventEmitter<any>();

  get stocks() {
    return (this.parent.get('stock') as FormArray).controls
  }

  ngOnInit(): void {
    console.log(this.stocks)
  }

  onRemove(group:any, index:number){
    this.removed.emit({group, index})
  }
  

}
