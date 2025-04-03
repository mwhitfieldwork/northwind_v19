import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalcModel } from '../../utilities/models/calc.model';
import { BasicTableComponent } from "../../shared/basic-table/basic-table.component";
import { MatTableDataSource } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [
    FormsModule, 
    JsonPipe, 
    MatCardModule,
    BasicTableComponent],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss'
})
export class CalculatorComponent {
  enteredInitialInvestment = '0';
  enteredAnnualInvestment = '0';
  enteredExpectedReturn = '5';
  enteredDuration = '10';
  investmentCalucationData:any[] = [];
  dataSource:any; //come back to this datatype
  displayedColumns = [
    {columnDef:'year', header:'Year'}, 
    {columnDef:'interest', header:'Interest'}, 
    {columnDef:'valueEndOfYear', header:'End Of Year Value'},
    {columnDef:'annualInvestment', header:'Annual Investment'},
    {columnDef:'totalInterest', header:'Total Interest'},
    {columnDef:'totalAmountInvested', header:'Total Amount Invested'}
  ];


  calculateInvestmentResults(data:CalcModel) {
    //const {initialInvestment, duration, annualInvestment, expectedReturn} = data; 
    //pulls out properties of the ovbject and stores them in different constants without haveing
    //to do eachone by one
    //deconstruct the object
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
        interest: interestEarnedInYear,
        valueEndOfYear: investmentValue,
        annualInvestment: data.annualInvestment,
        totalInterest: totalInterest,
        totalAmountInvested: data.initialInvestment + data.annualInvestment * year,
      });
    }
    
    this.dataSource = annualData;
  
    return annualData;
  }


  onSubmit(data: CalcModel){
    const calcData ={
      initialInvestment: +this.enteredInitialInvestment, //+ converts the string to a number
      duration:  +this.enteredDuration,
      annualInvestment:  +this.enteredAnnualInvestment,
      expectedReturn:  +this.enteredExpectedReturn
    }
    this.calculateInvestmentResults(calcData);
  }
}
