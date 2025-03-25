import { Component, ElementRef, inject, input, OnInit } from '@angular/core';
import { Category } from '../../../utilities/models/category';
import { StockCategoryService } from '../../../utilities/services/category-stock/category-stock.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { map } from 'rxjs';


@Component({
  selector: 'app-chart-1',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './chart-1.component.html',
  styleUrl: './chart-1.component.scss'
})
export class Chart1Component implements OnInit {
data= [125,100, 50, 75, 200,125,80,65];
xlabels= ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
ylabels=[0, 5000, 10000, 1500].reverse();
rectWidth = 10;
max:number = 250;
dimensions!: DOMRect;
outerPadding= 10;
padding = 0;
bandwidth= 0;
bandwidthCoef = 0.4; //bandwidth coefficient, how wide each bar is
left = 80; right=80; bottom =30 ;top=15;
innerHeight!:number;
innerWidth!:number;

categories: Category[] = [];//sales by category
private _categoriesService = inject(StockCategoryService);
categoriesList!:Subscription;
categorySalesList!:Subscription;
categoryName:string = "";


categorySalesForm!: FormGroup;
//margin = {top: this.top, right: this.right, bottom: this.bottom, left: this.left};

constructor(private element:ElementRef, private fb: FormBuilder) {
  //console.log(this.element.nativeElement);
  this.categorySalesForm  = this.fb.group({
    category_name:[''],
    category_year:['']
  });
}

ngOnInit(): void {
  const svg = this.element.nativeElement.getElementsByTagName('svg')[0];
  this.dimensions = svg.getBoundingClientRect();
  this.innerWidth = this.dimensions.width - this.left - this.right;
  this.innerHeight = this.dimensions.height - this.top - this.bottom;

  this.rectWidth = (this.innerWidth -2 * this.outerPadding) / this.data.length;
  this.padding = (1 - this.bandwidthCoef) * this.rectWidth;
  this.max = 1.3 * Math.max(...this.data); //1.3 = 130%
  this.bandwidth = this.rectWidth * this.bandwidthCoef;

  this.categoriesList = this._categoriesService.getCategories().subscribe(
    (response) => {
      this.categories = response;
    }
  );

  this.categorySalesForm.get('category_name')?.valueChanges.subscribe((value: string) => {
    this.categoryName = value; // Update your variable whenever the value changes
    console.log('Category Name Changed:', value); // Log or perform any action
  });

  this.categorySalesForm.get('category_year')?.valueChanges.subscribe((value: string) => {
    this.categorySalesList = this._categoriesService.getSalesByCategory(this.categoryName, value)
    .pipe(
      map((response)=> {
        return response.map(item => Number(item.totalPurchase))
      })
    )
    .subscribe((totalPurchases) => {
      this.data = totalPurchases
      console.log('Updated Data Array:', totalPurchases);
    });
  });

  
}


ngOnDestroy(): void {
  if(this.categoriesList){
    this.categoriesList.unsubscribe();
  }
}

}
