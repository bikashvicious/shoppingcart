import { OrderService } from './../../../shared/services/order.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent {
  orders: any;
  constructor(private orderService: OrderService) {
    this.orderService.getOrders()
    .subscribe(res=>{
      this.orders = res;
      console.log(this.orders);
      });
  }
}
