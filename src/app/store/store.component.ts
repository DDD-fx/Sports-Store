import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProductRepositoryService } from '../model/product.repository';
import { Product } from '../model/product.model';
import { CartService } from '../model/cart.service';
import { CartSummaryComponent } from './cart-summary/cart-summary.component';
import { CounterDirective } from './counter.directive';
import { CurrencyPipe, NgForOf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CartSummaryComponent, CounterDirective, NgForOf, CurrencyPipe],
})
export class StoreComponent {
  selectedCategory: string | undefined;

  productsPerPage = 4;

  selectedPage = 1;

  constructor(
    private readonly repository: ProductRepositoryService,
    private readonly cart: CartService,
    private readonly router: Router
  ) {}

  get products(): Product[] {
    console.log('store');
    let startFrom = (this.selectedPage - 1) * this.productsPerPage;
    return this.repository
      .getProducts(this.selectedCategory)
      .slice(startFrom, startFrom + this.productsPerPage);
  }

  get categories(): string[] {
    return this.repository.getCategories();
  }

  changeCategory(newCategory?: string) {
    this.selectedCategory = newCategory;
  }

  changePage(newPage: number) {
    this.selectedPage = newPage;
  }

  changePageSize(newSize: string) {
    this.productsPerPage = Number(newSize);
    this.changePage(1);
  }

  get pageCount(): number {
    return Math.ceil(
      this.repository.getProducts(this.selectedCategory).length / this.productsPerPage
    );
  }

  addProductToCart(product: Product) {
    this.cart.addLine(product);
    void this.router.navigateByUrl('/cart');
  }
}
