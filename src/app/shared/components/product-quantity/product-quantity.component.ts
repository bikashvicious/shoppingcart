import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'shared/models/product';
import { ProductService } from 'shared/services/product.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {
  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart;

  constructor(private cartService: ShoppingCartService, private productService: ProductService) { }

  addToCart() {
    // this.product.count = this.product.count + 1;
    // this.productService.updateProduct(this.product.key, this.product);
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    // this.product.count = this.product.count - 1;
    // this.productService.updateProduct(this.product.key, this.product);
    this.cartService.removeFromCart(this.product);
  }

}
