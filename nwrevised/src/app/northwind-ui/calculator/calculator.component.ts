import { CurrencyPipe, JsonPipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, Signal, signal, viewChild, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CalcModel } from '../../utilities/models/calc.model';
import { BasicTableComponent } from "../../shared/basic-table/basic-table.component";
import { MatTableDataSource } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { TooltipDirective } from '../../shared/tooltip/tooltip.directive';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [
    FormsModule, 
    JsonPipe, 
    MatCardModule,
    BasicTableComponent,
    TooltipDirective],
    providers: [CurrencyPipe],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss'
})
export class CalculatorComponent implements AfterViewInit{
    //inject the pipe instead of imports, to use in the class instead of assignment in the template

  //accessing the form fromthe class. ElementRef wrap the request 
  //element so that DOM acess can be given
  @ViewChild('form') form?: ElementRef<NgForm>
  
  private signalForm = viewChild<ElementRef<NgForm>>('form') //gives a signal as a reference example

  enteredInitialInvestment = signal('0'); 
  enteredAnnualInvestment = signal('0');
  enteredExpectedReturn = signal('5'); 
  enteredDuration = signal('10');

  investmentCalucationData:any[] = [];
  isCalculated = false;
  dataSource = new MatTableDataSource(this.investmentCalucationData); //come back to this datatype
  
  displayedColumns = [
    {columnDef:'year', header:'Year'}, 
    {columnDef:'interest', header:'Interest'}, 
    {columnDef:'valueEndOfYear', header:'End Of Year Value'},
    {columnDef:'annualInvestment', header:'Annual Investment'},
    {columnDef:'totalInterest', header:'Total Interest'},
    {columnDef:'totalAmountInvested', header:'Total Amount Invested'}
  ];

  constructor(private currencyPipe: CurrencyPipe) {}

  ngAfterViewInit(): void {
    //gives access to the signal form for the reset method
   // this.signalForm()?.nativeElement.reset(); 
  }

  calculateInvestmentResults(data:CalcModel) {
    //reset is only avaiable on the nativeLement  not on the form object itself
    //this.form?.nativeElement.reset();

    const annualData = [];
    let investmentValue = data.initialInvestment;
  
    for (let i = 0; i < data.duration; i++) {
      const year = i + 1;
      const interestEarnedInYear = investmentValue * (data.expectedReturn / 100);
      investmentValue += interestEarnedInYear + data.annualInvestment;
      
      const totalInterest =
        investmentValue - data.annualInvestment * year - data.initialInvestment;

      annualData.push({
        year: year,
        interest: this.formatAmount(interestEarnedInYear),
        valueEndOfYear: this.formatAmount(investmentValue) ,
        annualInvestment: this.formatAmount(data.annualInvestment),
        totalInterest: this.formatAmount(totalInterest),
        totalAmountInvested: data.initialInvestment + data.annualInvestment * year,
      });
    }

    //console.log(annualData);


    this.dataSource.data = annualData;
    this.isCalculated = true;
    return annualData;
  }
  formatAmount(amount: number): string | null {
    return this.currencyPipe.transform(amount, 'USD', 'symbol', '1.2-2');
  }

  onSubmit(data: CalcModel){
    const calcData ={
      initialInvestment: +this.enteredInitialInvestment(), //+ converts the string to a number
      duration:  +this.enteredDuration(),
      annualInvestment:  +this.enteredAnnualInvestment(),
      expectedReturn:  +this.enteredExpectedReturn()
    }
    this.calculateInvestmentResults(calcData);
  }
}
