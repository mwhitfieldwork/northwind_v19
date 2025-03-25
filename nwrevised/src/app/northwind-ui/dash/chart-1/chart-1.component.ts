import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart-1',
  standalone: true,
  imports: [],
  templateUrl: './chart-1.component.html',
  styleUrl: './chart-1.component.scss'
})
export class Chart1Component implements OnInit {
data= [125,100, 50, 75, 200,125,80,65];
xlabels= ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
ylabels=[0, 5000, 10000, 1500].reverse();
categories: string[] = ['Beverages', 'Condiments', 'Confections', 'DairyProducts', 'GrainsCereals', 'MeatPoultry', 'Seafood'] //sales by category
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

//margin = {top: this.top, right: this.right, bottom: this.bottom, left: this.left};

constructor(private element:ElementRef) {
  console.log(this.element.nativeElement);
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
}

}
