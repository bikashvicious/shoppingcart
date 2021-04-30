import { OrderService } from './../../../shared/services/order.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { AuthService } from 'shared/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.scss']
})
export class OrderViewComponent implements OnInit {

  cart;
  orders;
  userId: string;
  constructor(private orderService: OrderService, private authService: AuthService, private route: ActivatedRoute) {}

  async ngOnInit() {

    this.route.paramMap.subscribe(param => {
      this.userId = param.get('id');
    });

    this.orderService.getOrdersByUser(this.userId)
    .subscribe(res=> {
      let resource = res;
      this.orders = resource;
      console.log(this.orders);
    });
  }
}
