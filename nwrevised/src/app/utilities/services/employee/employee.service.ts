import { inject, Injectable } from '@angular/core';
import { Employee } from '../../models/employee';
import { catchError, Observable, tap, throwError} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private _http = inject(HttpClient)
  
  url:string = 'https://localhost:7216';
  
  constructor() { }

  get(): Observable<Employee[]> {
    var response = this._http.get<Employee[]>(`${this.url}/Employee/`)
      .pipe(
        tap(items => {
          console.log(items, 'Employees')
        }),
        catchError(this.handleError),
      )

    return response
  }

  private handleError(error: Response) {
    console.error(error);
    return throwError(() => error || 'Server error');
  }
}
