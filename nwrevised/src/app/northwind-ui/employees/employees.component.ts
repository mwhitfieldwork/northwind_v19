import { Component, EventEmitter, OnInit, Output, ViewChild, viewChild } from '@angular/core';
import { EmployeeComponent } from './employee/employee.component';
import { Employee } from '../../utilities/models/employee';
import { TerritoriesComponent } from "./territories/territories.component";

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [EmployeeComponent, TerritoriesComponent],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent implements OnInit {
selectedEmployee:Employee = {} as Employee;

@ViewChild(TerritoriesComponent) territoriesComponent!: TerritoriesComponent

employees:Employee[] = [
  {employeeId: 1,
  firstName: 'Nancy',
  lastName: 'Kevinson',
  title: 'Sales Boss',
  city: 'Seattle'},
  {employeeId: 2,
  firstName: 'David',
  lastName: 'Davolio',
  title: 'Sales Tech',
  city: 'Seattle'},
  {employeeId: 3,
  firstName: 'Mike',
  lastName: 'Williamson',
  title: 'Sales Representative',
  city: 'Seattle'}
];


ngOnInit(): void {
  console.log(this.employees)
}

onSelect(employee:Employee) {
  this.selectedEmployee = employee;
  console.log(employee, 'Employee handled at right level');
  this.territoriesComponent.onSelectTerritories(employee.employeeId)
}

}
