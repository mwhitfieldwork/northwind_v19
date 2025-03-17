import { AfterViewInit, Component, EventEmitter, inject, OnInit, Output, ViewChild, viewChild } from '@angular/core';
import { EmployeeComponent } from './employee/employee.component';
import { Employee } from '../../utilities/models/employee';
import { TerritoriesComponent } from "./territories/territories.component";
import { Subscription } from 'rxjs';
import { EmployeeService } from '../../utilities/services/employee/employee.service';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [EmployeeComponent, TerritoriesComponent],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent implements OnInit {
selectedEmployee:Employee = {} as Employee;
isLoading= false;
isSelected = false;
employees:Employee[] = [];
employeesList!:Subscription;
_employeeService = inject(EmployeeService);
 profile_pic!: string;

@Output() employeeSelected = new EventEmitter<number>();


ngOnInit(): void {
  this.isLoading = true;
  this.employeesList = this._employeeService.get()
  .subscribe(
    (response) => {
      this.isLoading = false;
      this.employees = response.slice(0, 7);
    }
  );
}

onSelect(employee:Employee) {
  this.selectedEmployee = employee;
  this.isSelected = true;
  this.profile_pic = `/${employee.firstName?.toLocaleLowerCase()}.png`;
  this.employeeSelected.emit(employee.employeeId);
}

}
