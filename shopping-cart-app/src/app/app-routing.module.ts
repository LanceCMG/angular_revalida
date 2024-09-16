import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { AdminGuard } from './admin.guard';
import { CustomerGuard} from './customer.guard'

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [CustomerGuard] },
  { path: 'cart', component: CartComponent, canActivate: [CustomerGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [CustomerGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [CustomerGuard] },
  { path: 'pending-orders', component: PendingOrdersComponent, canActivate: [CustomerGuard] },
  { path: 'dashboard-admin', component: DashboardAdminComponent, canActivate: [AdminGuard] },
  { path: 'products', component: ProductsComponent, canActivate: [AdminGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
  { path: 'acknowledgment', component: AcknowledgmentComponent, canActivate: [CustomerGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }  // Wildcard for 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
