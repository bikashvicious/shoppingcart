import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShoppingModule } from 'app/shopping/shopping.module';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { SharedModule } from 'shared/shared.module';

import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { OrderViewComponent } from './components/order-view/order-view.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';

@NgModule({
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent,
    OrderViewComponent,
    ClientDetailsComponent
  ],
  imports: [
    SharedModule,
    ShoppingModule,
    RouterModule.forChild([
      { path: 'admin/products/new', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/vieworder/:id', component: OrderViewComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/client-details', component: ClientDetailsComponent, canActivate: [AuthGuard, AdminAuthGuard] },
    ]),
  ],
  providers: [
    AdminAuthGuard
  ]
})
export class AdminModule { }
