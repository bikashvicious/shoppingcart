import { ShoppingCart } from "shared/models/shopping-cart";
import { ShoppingCartService } from "shared/services/shopping-cart.service";
import { Product } from "shared/models/product";
import { ProductService } from "shared/services/product.service";
import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { max, switchMap, takeUntil } from "rxjs/operators";
import { Subject, Observable } from "rxjs";
import {
  NgbCarousel,
  NgbCarouselConfig,
  NgbSlideEvent,
  NgbSlideEventSource,
} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit {
  products;
  arr1: Array<number> = [];
  hotItem: any;
  filteredProducts: Product[] = [];
  category: string;
  cart$: Observable<ShoppingCart>;

  constructor(
    public productService: ProductService,
    public route: ActivatedRoute,
    public cartService: ShoppingCartService
  ) {}

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
    this.populateProduct();
  }

  private populateProduct() {
    this.productService
      .getAll()
      .pipe(
        switchMap((prod) => {
          this.products = prod;
          for (let i = 0; i < this.products.length; i++) {
            this.arr1.push(this.products[i]["count"]);
            if (
              this.products[i].count ==
              this.arr1.reduce((op, item) => (op = op > item ? op : item), 0)
            ) {
              this.hotItem = this.products[i].imageUrl;
            }
          }
          return this.route.queryParamMap;
        })
      )
      .subscribe((params) => {
        this.category = params.get("category");
        this.applyFilter();
      });
  }

  private applyFilter() {
    this.filteredProducts = this.category
      ? this.products.filter((p) => p.category === this.category)
      : this.products;
  }
}
