import { Router } from "@angular/router";
import { AuthService } from "./../../services/auth.service";
import { HttpClient } from "@angular/common/http";
import { Component, Input, OnInit, Output } from "@angular/core";
import { EventEmitter } from "events";
import KhaltiCheckout from "khalti-checkout-web";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { OrderService } from "shared/services/order.service";
import axios from "axios";
import { Order } from "shared/models/order";
import { ShoppingCart } from "shared/models/shopping-cart";
import { ShippingDetails } from "shared/models/shipping-details";

@Component({
  selector: "app-khalti",
  templateUrl: "./khalti.component.html",
  styleUrls: ["./khalti.component.scss"],
})
export class KhaltiComponent implements OnInit {
  @Input() isValid: boolean = false;
  @Input() amount: number = 0;
  config = {};
  checkout;
  userId: string;
  @Input("cart") cart: ShoppingCart;
  shipping: ShippingDetails = new ShippingDetails();

  constructor(
    public service: OrderService,
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.$user.subscribe((user) => (this.userId = user.uid));
    console.log(this.userId);
    this.config = {
      // replace this key with yours
      publicKey: "test_public_key_950d43cd09d341d699716049f19e6725",
      productIdentity: "1234567890",
      productName: "Drogon",
      productUrl: "http://gameofthrones.com/buy/Dragons",
      eventHandler: {
        onSuccess(payload) {
          axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
          axios.defaults.headers.post["Content-Type"] =
            "application/x-www-form-urlencoded";
          axios
            .post("http://localhost:3000/transaction", {
              token: payload.token,
              amount: payload.amount,
            })
            .then(
              (response) => {
                // console.log(response)
                if(response['data'].message == "transaction completed") {
                  window.sessionStorage.removeItem("orderplaced");
                  window.sessionStorage.setItem("orderplaced", "orderplaced");
                  location.reload();
                }
              },
              (error) => {
                console.log(error);
              }
            );

          // let xhttp  = new XMLHttpRequest();
          // xhttp.open("POST", "https://khalti.com/api/v2/payment/verify/", true);
          // xhttp.setRequestHeader("Content-type", "application/json");
          // xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
          // xhttp.setRequestHeader('Access-Control-Allow-Headers', '*');
          // xhttp.setRequestHeader("Authorization", "Key test_secret_key_33bc15357251406ab8f488cc44844d35");
          // xhttp.send(`amount=${payload.amount}&token=${payload.token}`);
          // hit merchant api for initiating verfication
        },
        // onError handler is optional
        onError(error) {
          // handle errors
          // console.log(error);
        },
        onClose() {
          // console.log('widget is closing');
        },
      },
      paymentPreference: [
        "KHALTI",
        "EBANKING",
        "MOBILE_BANKING",
        "CONNECT_IPS",
        "SCT",
      ],
    };
    this.checkout = new KhaltiCheckout(this.config);
  }

  async placeOrder() {
    const order = new Order(this.userId, this.shipping, this.cart);
    const result = await this.orderService.placeOrder(order);
    this.router.navigate(["/order-success", result.key]);
  }

  showPopUp() {
    // minimum transaction amount must be 10, i.e 1000 in paisa.
    this.checkout.show({ amount: this.amount * 100 });
  }
}
