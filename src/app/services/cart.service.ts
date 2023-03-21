import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Order } from './order.service';

const api_url ="https://localhost:44337/api/Orders"

@Injectable({
  providedIn: 'root'
})
export class CartService {

  //private apiUrl = 'https://localhost:44337/api/Orders';

  private cartItems: Product[] = [];
  private cartSubject = new BehaviorSubject<Product[]>([]);
  private itemCount = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) { }

  getCartItems(): Observable<Product[]> {
    return this.cartSubject.asObservable();
  }

  addToCart(product: Product) {
    this.cartItems.push(product);
    this.cartSubject.next(this.cartItems);
    this.itemCount.next(this.cartItems.length);
  }

  getItemCount() {
    return this.itemCount.asObservable();
  }

  clearCart() {
    this.cartItems = [];
    // return this.cartItems;
  }

  orderCart(body:any): Observable<Order> {
    // const purchasePayload = { items: this.cartItems };
    // return this.http.post('https://localhost:44337/api/Orders', purchasePayload);
    return this.http.post<Order>('https://localhost:44337/api/Orders', this.cartItems);
  }
}
