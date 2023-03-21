import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Product } from '../models/product';

export interface Order {
  id: number;
  customerName: string;
  productName: string;
  quantity: number;
  unitPrice: string;
  totalCost: string;
  status: string;
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private ordersUrl = 'https://localhost:44337/api/Orders';

  orders : any[] = [];

  constructor(private http: HttpClient) { }

getOrders(): Observable<Order[]> {
  return of(this.orders);
  // return this.http.get<Order[]>(this.ordersUrl)
  //   .pipe(
  //     tap(_ => console.log('fetched orders')),
  //     catchError(this.handleOrderError<Order[]>('getOrders', []))
  //   );
}

markAsComplete(order:any): Observable<Order> {
  const index = this.orders.indexOf(order);
  if (index > -1) {
    this.orders[index].completed = true;
  }
  return of(this.orders[index]);
}

getCompletedOrders(): Observable<any[]> {
  const completedStatus = 'completed';
  const url = `${this.ordersUrl}?status=${completedStatus}`;
  return this.http.get<any[]>(url);
}

/** PUT: update the order on the server */
updateOrder(order: Order): Observable<any> {
  const url = `${this.ordersUrl}/${order.id}`;
  return this.http.put(url, order, httpOptions).pipe(
    tap(_ => console.log(`updated order id=${order.id}`)),
    catchError(this.handleOrderError<any>('updateOrder'))
  );
}

private handleOrderError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.error(error);
    console.log(`${operation} failed: ${error.message}`);
    return of(result as T);
  };
}

createOrder(order: Order): Observable<any> {
  return this.http.post(this.ordersUrl, order);
}

}






// import { Injectable } from '@angular/core';
// import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
// import { Observable, throwError, of } from 'rxjs';
// import { catchError, tap } from 'rxjs/operators';
// import { Product } from '../models/product';
// import { Order } from '../models/order';

// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };

// @Injectable({
//   providedIn: 'root'
// })
// export class OrderService {
//   private ordersUrl = 'https://localhost:44337/api/Orders';

//   constructor(private http: HttpClient) { }


// /** GET orders from the server */
// getOrders(): Observable<Order[]> {
//   return this.http.get<Order[]>(this.ordersUrl)
//     .pipe(
//       tap(_ => console.log('fetched orders')),
//       catchError(this.handleError<Order[]>('getOrders', []))
//     );
// }

// /** PUT: update the order on the server */
// updateOrder(order: Order): Observable<any> {
//   const url = `${this.ordersUrl}/${order.id}`;
//   return this.http.put(url, order, httpOptions).pipe(
//     tap(_ => console.log(`updated order id=${order.id}`)),
//     catchError(this.handleError<any>('updateOrder'))
//   );
// }

// private handleError<T>(operation = 'operation', result?: T) {
//   return (error: any): Observable<T> => {
//     console.error(error);
//     console.log(`${operation} failed: ${error.message}`);
//     return of(result as T);
//   };
// }
// }








// // import { Injectable } from '@angular/core';
// // import { HttpClient } from '@angular/common/http';
// // import { Order } from '../models/order';
// // import { Observable } from 'rxjs';
// // @Injectable({
// //   providedIn: 'root'
// // })
// // export class OrderService {
// //   private ordersUrl = 'https://localhost:44337/api/Products'
// //   constructor(private http: HttpClient) { }

// //   getOrders(): Observable<Order[]> {
// //     return this.http.get<Order[]>(this.ordersUrl);
// //   }

// //   updateOrder(order: Order): Observable<any> {
// //     return this.http.put(`${this.ordersUrl}/${order.id}`, order);
// //   }

// //   addOrder(order: Order): Observable<Order> {
// //     return this.http.post<Order>(this.ordersUrl, order);
// //   }
// // }

