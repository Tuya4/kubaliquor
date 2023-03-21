import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Product } from '../models/product';
import { BehaviorSubject } from 'rxjs';



// // export interface Order {
// //   id: number;
// //   productName: string;
// //   quantity: number;
// //   unitPrice: number;
// //   totalCost: number;
// //   status: string;
// }

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://localhost:44337/api/Products';
  // private ordersUrl = 'https://localhost:44337/api/Orders';

  private products = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(product: Product): Observable<Product> {
    const url = `${this.apiUrl}/${product.productName}`;
    return this.http.put<Product>(url, product);
  }

  deleteProduct(id: any): Observable<any> {
    const url = `${this.apiUrl}${id}`;
    return this.http.delete(url).pipe(
      catchError((error: any) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  // deleteProduct(product: Product): Observable<Product> {
  //   const url = `${this.apiUrl}/${product.productName}`;
  //   return this.http.delete<Product>(url);
  // }











  // getProducts(): Observable<Product[]> {
  //   return this.http.get<Product[]>(this.apiUrl)
  //     .pipe(
  //       catchError(this.handleError)
  //     );
  // }

  // addProduct(product: Product): Observable<Product> {
  //   return this.http.post<Product>(this.apiUrl, product)
  //     .pipe(
  //       catchError(this.handleError)
  //     );
  // }

  // updateProduct(id: number, product: Product): Observable<Product> {
  //   const url = `${this.apiUrl}/${id}`;
  //   return this.http.put<Product>(url, product)
  //     .pipe(
  //       catchError(this.handleError)
  //     );
  // }

  // deleteProduct(id: number): Observable<{}> {
  //   const url = `${this.apiUrl}/${id}`;
  //   return this.http.delete(url)
  //     .pipe(
  //       catchError(this.handleError)
  //     );
  // }

  // private handleError(error: HttpErrorResponse) {
  //   if (error.error instanceof ErrorEvent) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     console.error('An error occurred:', error.error.message);
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong,
  //     console.error(
  //       `Backend returned code ${error.status}, ` +
  //       `body was: ${error.error}`);
  //   }
  //   // return an observable with a user-facing error message
  //   return throwError(
  //     'Something bad happened; please try again later.');
  // }

 /** GET orders from the server */
// getOrders(): Observable<Order[]> {
//   return this.http.get<Order[]>(this.ordersUrl)
//     .pipe(
//       tap(_ => console.log('fetched orders')),
//       catchError(this.handleOrderError<Order[]>('getOrders', []))
//     );
// }

// /** PUT: update the order on the server */
// updateOrder(order: Order): Observable<any> {
//   const url = `${this.ordersUrl}/${order.id}`;
//   return this.http.put(url, order, httpOptions).pipe(
//     tap(_ => console.log(`updated order id=${order.id}`)),
//     catchError(this.handleOrderError<any>('updateOrder'))
//   );
// }

// private handleOrderError<T>(operation = 'operation', result?: T) {
//   return (error: any): Observable<T> => {
//     console.error(error);
//     console.log(`${operation} failed: ${error.message}`);
//     return of(result as T);
//   };
// }

// }
}
