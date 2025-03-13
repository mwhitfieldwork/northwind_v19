import { Component, input, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'stock-branch',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './stock-branch.component.html',
  styleUrl: './stock-branch.component.scss'
})
export class StockBranchComponent {
  parent = input<FormGroup>(new FormGroup({})); 
}
