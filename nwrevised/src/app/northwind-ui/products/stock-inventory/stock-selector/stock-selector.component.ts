import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Category } from '../../../../utilities/models/category';
import { CustomerProducts } from '../../../../utilities/models/customerProducts.model';
@Component({
  selector: 'stock-selector',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './stock-selector.component.html',
  styleUrl: './stock-selector.component.scss'
})
export class StockSelectorComponent {
  parent = input<FormGroup>(new FormGroup({})); 
  customerProducts = input<CustomerProducts[]>([]);
  @Output() added = new EventEmitter<any>();

  onAdd(){
    console.log(this.parent().get('selector')?.value, 'Selector')
    this.added.emit(this.parent().get('selector')?.value);
    this.parent().get('selector')?.reset({
      category_id:'',
      quantity:10,
      name:''
    });
    
    this.parent().get('selector')?.setValue({ //updates mulitple controls at once, must have the keyand the value
      category_id:'',
      quantity:10
    });
    this.parent().get('selector')?.patchValue({//used to update a single control
      category_id:''
    });
  }
}
