import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EmployeeComponent } from './employee/employee.component';
import { Employee } from '../../utilities/models/employee';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [EmployeeComponent],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent implements OnInit {
@Output() employeeID = new EventEmitter<number>();

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
  console.log(employee.employeeId);
  this.employeeID.emit(employee.employeeId);
}

}
