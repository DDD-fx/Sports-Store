import { Injectable, OnDestroy } from '@angular/core';
import { Product } from './product.model';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  shareReplay,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductRepositoryService implements OnDestroy {
  private _updateProducts$ = new BehaviorSubject<void>(undefined);

  public products$: Observable<Product[]> = this._updateProducts$.pipe(
    switchMap(() => this.apiService.getProducts()),
    tap((products) => (this.products = products)),
    shareReplay(1)
  );

  public products: Product[] = [];

  private destroy$ = new Subject<boolean>();

  constructor(private apiService: ApiService) {}

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getProducts(category$: BehaviorSubject<string | undefined>): Observable<Product[]> {
    return combineLatest([this.products$, category$]).pipe(
      map(([products, cat]) => products.filter((p) => cat == undefined || cat == p.category))
    );
  }

  getCategories(): Observable<string[]> {
    return this.products$.pipe(
      map((products) =>
        products
          .map((p) => p.category ?? '(None)')
          .filter((c, index, array) => array.indexOf(c) == index)
          .sort()
      )
    );
  }

  getProduct(id: string): Product | undefined {
    return this.products.find((p) => p.id === Number(id));
  }

  saveProduct(product: Product): void {
    if (!product.id) {
      this.apiService
        .saveProduct(product)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => this._updateProducts$.next());
    } else {
      this.apiService
        .updateProduct(product)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => this._updateProducts$.next());
    }
  }

  deleteProduct(id: number): void {
    this.apiService
      .deleteProduct(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this._updateProducts$.next());
  }
}
