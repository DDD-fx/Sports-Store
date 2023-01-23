import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProductRepositoryService } from '../model/product.repository';
import { Product } from '../model/product.model';
import { CartService } from '../model/cart.service';
import { CartSummaryComponent } from './cart-summary/cart-summary.component';
import { CounterDirective } from './counter.directive';
import { AsyncPipe, CurrencyPipe, NgForOf, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CartSummaryComponent, CounterDirective, NgForOf, CurrencyPipe, AsyncPipe, NgIf],
})
export class StoreComponent {
  selectedCategory$ = new BehaviorSubject<string | undefined>(undefined);

  productsPerPage$ = new BehaviorSubject<number>(4);

  selectedPage$ = new BehaviorSubject<number>(1);

  products$ = this.getProducts();

  categories$ = this.getCategories();

  pageCount$ = new BehaviorSubject<number>(1);

  constructor(
    private readonly productRepositoryService: ProductRepositoryService,
    private readonly cart: CartService,
    private readonly router: Router
  ) {}

  getProducts(): Observable<Product[]> {
    return combineLatest([
      this.productRepositoryService.getProducts(this.selectedCategory$),
      this.selectedPage$,
      this.productsPerPage$,
    ]).pipe(
      map(([products, selectedPage, productsPerPage]) => {
        this.pageCount$.next(Math.ceil(products.length / productsPerPage));
        const startFrom = (selectedPage - 1) * productsPerPage;
        return products.slice(startFrom, startFrom + productsPerPage);
      })
    );
  }

  getCategories(): Observable<string[]> {
    return this.productRepositoryService.getCategories();
  }

  changeCategory(newCategory: string | undefined = undefined): void {
    this.selectedCategory$.next(newCategory);
    this.changePage(1);
  }

  changePage(newPage: number): void {
    this.selectedPage$.next(newPage);
  }

  changePageSize(newSize: string): void {
    this.productsPerPage$.next(Number(newSize));
    if (Number(newSize) > this.pageCount$.value) this.changePage(1);
  }

  addProductToCart(product: Product): void {
    this.cart.addLine(product);
    void this.router.navigateByUrl('/cart');
  }
}
