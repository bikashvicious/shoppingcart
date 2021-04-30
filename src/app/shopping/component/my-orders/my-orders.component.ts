import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'shared/services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from 'shared/services/order.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit, OnDestroy {

  orders: any;
  subscription: Subscription;
  userId: string;
  cart$: Observable<ShoppingCart>;
  items: any;

  constructor(private orderService: OrderService,
              private authService: AuthService,
              private cartService: ShoppingCartService) {}

  async ngOnInit() {
    this.subscription = await this.authService.$user.subscribe(user => this.userId = user.uid);
    this.orderService.getOrdersByUser(this.userId)
    .subscribe(res=> {
      let resource = res;
      this.orders = resource;
    });
    this.cart$ = await this.cartService.getCart();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
