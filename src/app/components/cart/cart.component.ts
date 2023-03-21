import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/orders.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];


  constructor(private cartService: CartService, private router:Router) { }

  goToDashboard() {
    this.router.navigateByUrl('/dashboard');
  }
  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(cartItems => {
      this.cartItems = cartItems;
    });

  }

  getTotal() {
    return this.cartItems.reduce((total, item) => total + item.unitPrice, 0);
  }

  removeFromCart(item: Product) {
    this.cartItems = this.cartItems.filter(i => i !== item);
  }

  clearCart(){
    this.cartItems = [];
  }

  orderCart(){
    this.cartService.orderCart(this.cartService.orderCart).subscribe(
      (response) => {
        console.log('Order placed successfully:', response);
        this.cartService.clearCart();
        this.router.navigateByUrl('/dashboard/orders');
      },
      (error) => {
        console.error('Failed to place order:', error);
      }
    );
  }

  goBack() {
    this.router.navigateByUrl('/dashboard/make-order');
}
}
