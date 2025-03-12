import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, Observable, tap, throwError} from 'rxjs';
import { Category } from '../../../northwind-ui/products/product-table/models/category';

@Injectable({
  providedIn: 'root'
})
export class StockCategoryService {
  private _http = inject(HttpClient)
  
  url:string = 'https://localhost:7216';
  
  constructor() { }

  getCategories(): Observable<Category[]> {
    var response = this._http.get<Category[]>(`${this.url}/Category/`)
      .pipe(
        tap(items => {
          console.log(items, 'Categories')
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
