import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthService } from './services/auth.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductService } from './services/product.service';
import { MatDialogModule } from '@angular/material/dialog';
import { OrdersComponent } from './components/orders/orders.component';



import { MatToolbarModule } from '@angular/material/toolbar';
import { ProductsComponent } from './components/products/products.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Route, RouterModule, Routes } from '@angular/router';
// import { DialogComponent } from './components/make-order/make-order.component';
import { OrderService } from './services/order.service';
import { CompletedOrdersComponent } from './components/completed-orders/completed-orders.component';
import { MakeOrderComponent } from './components/make-order/make-order.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { CartComponent } from './components/cart/cart.component';
import { CartService } from './services/cart.service';





@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    DashboardComponent,
    LoginComponent,
    ProductsComponent,
    // DialogComponent,
    OrdersComponent,
    CompletedOrdersComponent,
    MakeOrderComponent,
    LoadingSpinnerComponent,
    CartComponent,




  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FormsModule,
    NgbModule,
    MatDialogModule,





  ],
  providers: [
    AuthService,
    ProductService,
    OrderService,
    CartService

  ],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }

