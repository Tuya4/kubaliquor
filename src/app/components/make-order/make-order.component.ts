import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { Order } from 'src/app/models/orders.model';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-make-order',
  templateUrl: './make-order.component.html',
  styleUrls: ['./make-order.component.css']
})
export class MakeOrderComponent implements OnInit {

  products: any[] = [];
  selectedProduct!: Product;
  quantity!: number;
  itemCount!: number;

  constructor(private productService: ProductService, private orderService: OrderService, private router:Router,
    private cartService: CartService) { }

  goToDashboard() {
    this.router.navigateByUrl('/dashboard');
  }

  goToCart() {
    this.router.navigateByUrl('/dashboard/make-order/cart');
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.selectedProduct = products[0];
    }),
    this.cartService.getItemCount().subscribe(count => {
      this.itemCount = count;
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);

  }

  getProducts() {
    this.productService.getProducts().subscribe(
      products => {
        this.products = products;
      },
      error => {
        console.log('Error retrieving products: ', error);
      }
    );
  }

  // makeOrder() {
  //   const order: Order = {
  //     id: this.selectedProduct.id,
  //     quantity: this.quantity,
  //     customerName: '',
  //     productName: '',
  //     unitPrice: '',
  //     totalCost: '',
  //     status: ''
  //   };
  //   this.orderService.createOrder(order).subscribe((response: any) => {
  //     // Handle the response from the API, such as displaying a success message
  //     console.log('Order created successfully: ', response);
  //   },
  //     (    error: any) => {
  //     console.log('Error creating order: ', error);
  //   }
  //   );
  // }

}
