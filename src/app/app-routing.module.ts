import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProductsComponent } from './components/products/products.component';
import { OrdersComponent } from './components/orders/orders.component';
import { CompletedOrdersComponent } from './components/completed-orders/completed-orders.component';
import { MakeOrderComponent } from './components/make-order/make-order.component';
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [
  {path:'', redirectTo:'dashboard', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'dashboard', component:DashboardComponent},
  {path:'dashboard/products', component:ProductsComponent},
  {path:'dashboard/orders', component:OrdersComponent},
  {path:'dashboard/completed-orders', component:CompletedOrdersComponent},
  {path:'dashboard/make-order', component:MakeOrderComponent},
  {path:'dashboard/make-order/cart', component:CartComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
