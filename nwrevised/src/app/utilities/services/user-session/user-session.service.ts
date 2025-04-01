import { inject, Injectable, signal } from '@angular/core';
import { Authentication } from '../../models/authentication';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserSessionService {
  private _http = inject(HttpClient);

  url:string = 'https://localhost:7216';
  errorMessage:any;

  setUser(id:string): void {
      localStorage.setItem('user', JSON.stringify(id)); 
  }

  getUser(userId: string): Observable<Authentication> {
    let url = `${this.url}/api/Login/${userId}`;
    var response = this._http.get<Authentication>(url)
      .pipe(
        tap(item => {
          //console.log(item)
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
