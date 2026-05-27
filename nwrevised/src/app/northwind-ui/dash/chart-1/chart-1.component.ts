import { Component, ElementRef, inject, input, OnInit } from '@angular/core';
import { Category } from '../../../utilities/models/category';
import { StockCategoryService } from '../../../utilities/services/category-stock/category-stock.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BaseChartDirective } from 'ng2-charts';
import { NgFor } from '@angular/common';
import { ChartData, ChartOptions, ChartType,
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend
 } from 'chart.js'; 
 Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

@Component({
  selector: 'app-chart-1',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    FormsModule, 
    MatTooltipModule,
    MatInputModule, 
    MatFormFieldModule, 
    MatSelectModule,
    BaseChartDirective, 
    NgFor
  ],
  templateUrl: './chart-1.component.html',
  styleUrl: './chart-1.component.scss'
})
export class Chart1Component implements OnInit {

rectWidth = 10;
max:number = 250;
maxHeight = 0;
dimensions!: DOMRect;
outerPadding= 50;
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
data:number[] = [185,100, 50, 75, 200,125,80,65];
xlabels:string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
xFullLabels:string[] = [];
ylabels:number[] =[0, 50, 100, this.max].reverse();

//donutChartType: ChartType = 'doughnut';
donutChartType = 'doughnut' as const;
donutChartData: ChartData<'doughnut'> = {
  labels: [],
  datasets: [{
    label: 'CategoriesA',
    data: [1],
    backgroundColor: [
      '#FF6F61', '#FFB347', '#FFD700', '#FF8C00', '#FF4500',
      '#DC143C', '#E9967A', '#CD5C5C', '#FFA07A', '#F4A460', '#D2691E', '#C0392B'
    ],
    borderWidth: 0,
    hoverBorderWidth: 0,
    borderColor: 'transparent',
    borderAlign: 'inner',
    hoverOffset: 32
  }]
};

donutChartOptions: ChartOptions<'doughnut'> = {
  responsive: true,
  cutout: '75%',
  elements: {
    arc: {
      borderWidth: 0,
      hoverBorderWidth: 0,
      borderColor: 'transparent'
    }
  },
  plugins: {
    legend: {
      position: 'right',
      labels: {
        color: '#1a1a2e',
        font: { size: 12 },
        padding: 16,
        boxWidth: 14,
        // optional: makes legend markers look less “boxed”
        usePointStyle: true,
        pointStyle: 'circle'
      }
    },
    tooltip: { enabled: true }
  }
};

constructor(private element:ElementRef, private fb: FormBuilder) {
  //console.log(this.element.nativeElement);
  this.categorySalesForm  = this.fb.group({
    category_name:[''],
    category_year:['']
  });
}

ngOnInit(): void {
  this.categoriesList = this._categoriesService.getCategories().subscribe(
    (response) => {
      this.categories = response;
    }
  );

  this.categorySalesForm.get('category_name')?.valueChanges.subscribe((value: string) => {
    this.categoryName = value; // Update your variable whenever the value changes
  });

  this.categorySalesForm.get('category_year')?.valueChanges.subscribe((value: string) => {
    this.categorySalesList = this._categoriesService.getSalesByCategory(this.categoryName, value)
    .subscribe((sales) => {
      
      //filter the number into a new data set
      this.data = sales
      .map((x)=> Number(x.totalPurchase) *.025)
      .slice(0,8);
      
      //filter the names as the column data labels
      this.xlabels = sales.map((x) =>
        x.productName.length > 3 
          ? x.productName.slice(0, 15) + '...' 
          : x.productName
      ).slice(0,8);
      
      this.maxHeight = Math.max(...this.data);
      console.log(this.maxHeight);

      this.xFullLabels = sales.map((x) => x.productName) //full labels to reveal full names by tooltip
      
      this.displayData();
    });
  }); 

  this.displayData();
}

displayData(): void {

  // Reassign the whole object so Angular detects the change
  this.donutChartData = {
    labels: [...this.xlabels],
    datasets: [{
      label: this.categoryName,
      data: [...this.data],
      backgroundColor: [
        '#FF6F61', '#FFB347', '#FFD700', '#FF8C00', '#FF4500',
        '#DC143C', '#E9967A', '#CD5C5C', '#FFA07A', '#F4A460', '#D2691E', '#C0392B'
      ],
      borderWidth: 0,
      hoverOffset: 12
    }]
  };
}


ngOnDestroy(): void {
  if(this.categoriesList){
    this.categoriesList.unsubscribe();
  }
}

}
