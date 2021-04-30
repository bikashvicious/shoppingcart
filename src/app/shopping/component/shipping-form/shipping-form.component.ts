import { ShippingDetails } from 'shared/models/shipping-details';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from 'shared/models/order';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {

  @Input('cart') cart: ShoppingCart;
  shipping: ShippingDetails = new ShippingDetails();
  subscription: Subscription;
  userId: string;
  orderPlaced = [];

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router) {}

  async ngOnInit() {
    this.subscription = this.authService.$user.subscribe(user => this.userId = user.uid);
    if(window.sessionStorage.getItem("orderplaced")) {
      this.orderPlaced.push(window.sessionStorage.getItem("orderplaced"))
    }
  }

  async placeOrder() {
    const order = new Order(this.userId, this.shipping, this.cart);
    const result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
    window.sessionStorage.removeItem("orderplaced");
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
