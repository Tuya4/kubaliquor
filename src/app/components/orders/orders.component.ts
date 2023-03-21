import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
// import { OrderService } from './services/order.service';


export interface Order {
  id: number;
  customerName: string;
  productName: string;
  quantity: number;
  unitPrice: string;
  totalCost: string;
  status: string;
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: any[] = [];

  constructor(private productService: ProductService, private router:Router, private orderService: OrderService) { }


  goToDashboard() {
    this.router.navigateByUrl('/dashboard');
  }
  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this.orderService.getOrders()
      .subscribe(orders => this.orders = orders);
  }

  completeOrder(order: Order): void {

    order.status = 'complete';
    this.orderService.updateOrder(order)
      .subscribe(updatedOrder => {
        console.log('Order completed:', updatedOrder);
      });
  }

  markAsComplete(order:any) {
    order.completed = true;
  }

}









// import { Component, OnInit } from '@angular/core';
// import { ProductService } from './services/product.service';

// @Component({
//   selector: 'app-orders',
//   templateUrl: './orders.component.html',
//   styleUrls: ['./orders.component.css']
// })
// export class OrdersComponent implements OnInit {
//   products: any[] = [];

//   constructor(private productService: ProductService) { }

//   ngOnInit(): void {
//     this.products = this.productService.getProducts();
//   }

//   completeOrder(product: any) {
//     // perform action to mark the order as completed
//     product.completed = true;
//     this.productService.updateProduct(product);
//   }
// }

// // import { Component, OnInit } from '@angular/core';
// // import { OrderService } from 'src/app/services/order.service';



// // @Component({
// //   selector: 'app-orders',
// //   templateUrl: './orders.component.html',
// //   styleUrls: ['./orders.component.css']
// // })
// // export class OrdersComponent implements OnInit {
// //   products: any[] = [];
// //   customerName: string;
// //   productName: string;
// //   quantity: number;

// //   constructor(private orderService: OrderService) {
// //     this.products = this.orderService.getProducts();
// //    }



// //   ngOnInit(): void {
// //   }

// //   submitOrder() {
// //     const order: Order = {
// //       id: null,
// //       customerName: this.customerName,
// //       productName: this.productName,
// //       quantity: this.quantity,
// //       completed: false
// //     };
// //     this.orderService.addOrder(order).subscribe();
// //     this.customerName = '';
// //     this.productName = '';
// //     this.quantity = null;
// //   }
// // }
