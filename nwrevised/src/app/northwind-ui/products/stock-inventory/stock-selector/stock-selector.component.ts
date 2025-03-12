import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ProductModel } from '../../../../utilities/models/product';
@Component({
  selector: 'stock-selector',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './stock-selector.component.html',
  styleUrl: './stock-selector.component.scss'
})
export class StockSelectorComponent {
  @Input() parent!: FormGroup //switch to signal
  @Input() products!:ProductModel[];
  @Output() added = new EventEmitter<any>();

  onAdd(){
    console.log(this.parent.get('selector')?.value, 'Selector')
    this.added.emit(this.parent.get('selector')?.value);
    this.parent.get('selector')?.reset({// reset changes the dom back to pristine, where set and patch value wont
      product_id:'',
      quantity:10,
      name:''
    });
    
    this.parent.get('selector')?.setValue({ //updates mulitple controls at once, must have the keyand the value
      product_id:'',
      quantity:10
    });
    this.parent.get('selector')?.patchValue({//used to update a single control
      product_id:''
    });
  }
}
