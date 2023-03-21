import { Component, OnInit, Inject } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';

export interface Order {
id: number;
customerName: string;
productName: string;
quantity: number;
unitPrice: number;
totalCost: number;
status: string;
}

@Component({
  selector: 'app-completed-orders',
  templateUrl: './completed-orders.component.html',
  styleUrls: ['./completed-orders.component.css']
})
export class CompletedOrdersComponent implements OnInit {
  orders: any[]  = [];

  constructor(@Inject(OrderService)private orderService: OrderService,
  private router:Router) { }

  ngOnInit(): void {
    this.orderService.getCompletedOrders().subscribe((orders: any[]) => {
      this.orders = orders;
    });
  }

  goToDashboard() {
    this.router.navigateByUrl('/dashboard');
  }

  // updateOrderStatus(order: Order) {
  //   order.completed = !order.completed;
  //   this.orderService.updateOrder(order).subscribe();
  // }
}
