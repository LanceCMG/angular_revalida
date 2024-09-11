import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PendingOrdersComponent } from './pending-orders/pending-orders.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { ProductsComponent } from './products/products.component';
import { AdminComponent } from './admin/admin.component';
import { AcknowledgmentComponent } from './acknowledgment/acknowledgment.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    DashboardComponent,
    CartComponent,
    ProfileComponent,
    CheckoutComponent,
    PendingOrdersComponent,
    DashboardAdminComponent,
    ProductsComponent,
    AdminComponent,
    AcknowledgmentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
