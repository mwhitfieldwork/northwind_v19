import { Component, computed, EventEmitter, inject, input, Input, OnInit, Output,  } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { map, Observable, Subscription } from 'rxjs';
import { CutomerService } from '../../../../utilities/services/customer-info/cutomer.service';
import { DistinctCustomer } from '../../../../utilities/models/distinctCustomers.model';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'stock-branch',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './stock-branch.component.html',
  styleUrl: './stock-branch.component.scss'
})
export class StockBranchComponent implements OnInit {
  parent = input<FormGroup>(new FormGroup({})); 
  private _customerService = inject(CutomerService)
  customerList!:Subscription;
  topCustomers: DistinctCustomer[] = [];
  @Output() slectedCustomer = new EventEmitter<any>()


  ngOnInit(): void {
    this.getCustomers();

    const storeGroup = this.parent().get('store') as FormGroup;

    storeGroup.get('customer')?.valueChanges.subscribe(value => {
      console.log('Selected customer:', value);
      this.slectedCustomer.emit(value);
    });
  }

  getCustomers(): void {
    this.customerList = this._customerService.getCustomers()
    .pipe(
      map(customers => {
        return customers.map((customer, index) => ({
          ...customer, 
          pkID: index + 1
        }));
      })
    )
    .subscribe(
      (response) => {
        this.topCustomers = response
        console.log(this.topCustomers, "TOP CUSTOMERS");
      });
  }

}
