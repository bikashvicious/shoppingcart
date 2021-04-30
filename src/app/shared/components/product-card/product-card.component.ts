import { ProductService } from './../../services/product.service';
import { AuthService } from './../../services/auth.service';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Product } from 'shared/models/product';
import { Component, Input } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;
  appUser$;
  private destroy$ = new Subject();

  constructor(
    private cartService: ShoppingCartService,
    private auth: AuthService,
    private productService: ProductService
    ) { }

  ngOnInit() {
    this.auth.appUser$.pipe(takeUntil(this.destroy$))
    .subscribe(user => this.appUser$ = user );
  }

  // addToCart() {
  //   this.product.count = this.product.count + 1;
  //   this.productService.updateProduct(this.product.key, this.product);
  //   this.cartService.addToCart(this.product);
  // }

  addToCart() {
    this.product.count = this.product.count + 1;
    this.productService.updateProduct(this.product.key, this.product);
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.product.count = this.product.count - 1;
    this.productService.updateProduct(this.product.key, this.product);
    this.cartService.removeFromCart(this.product);
  }

}
