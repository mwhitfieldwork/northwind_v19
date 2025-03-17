import { inject, Injectable } from '@angular/core';
import { Employee } from '../../models/employee';
import { catchError, map, Observable, tap, throwError} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private _http = inject(HttpClient)
  
  url:string = 'https://localhost:7216';
  errorMessage:any;

  constructor() { }

  get(): Observable<Employee[]> {
    return this._http.get<Employee[]>(`${this.url}/Employee/`)
    .pipe( 
      tap(items => {
        console.log(this.url)
      }),
      catchError(this.handleError),
    )
  }

  dropEmployee(id:number): void {
    let url = `${this.url}/Employee/${id}`;
    var response = this._http.delete(url)
    .subscribe({
      next: data => {
          console.log( 'Delete successful');
      },
      error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!!', error);
      }
    });
  }

  private handleError(error: Response) {
    console.error(error);
    return throwError(() => error || 'Server error');
  }
}
