import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase,
              private cartService: ShoppingCartService,
              private http: HttpClient) { }

  async placeOrder(order) {
    const result = await this.db.list('/orders').push(order);
    this.cartService.clearCart();
    return result;
  }

  getOrders() {
    return this.db.list('/orders').snapshotChanges()
      .pipe(
        map(changes => changes.map(c => ({key: c.key, ...c.payload.val() })))
      );
  }

  getOrdersByUser(userId: string) {
    return this.db.list('/orders', ref =>
      ref.orderByChild('userId').equalTo(userId)).snapshotChanges()
      .pipe(
        map(changes => changes.map(c => ({key: c.key, ...c.payload.val() })))
      );
  }
  getOrdersByUserw() {
    return this.db.list('/orders', ref =>
      ref.orderByKey()).snapshotChanges()
      .pipe(
        map(changes => changes.map(c => ({key: c.key, ...c.payload.val() })))
      );
  }

  verify(url: any, payload: any, headers?: any) {
    return this.http.post(url, payload, headers = headers);
  }
}
