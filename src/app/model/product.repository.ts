import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductRepositoryService {
  public products$: Observable<Product[]> = this.dataSource.getProducts();

  constructor(private dataSource: ApiService) {}

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

  getProduct(id: number): Observable<Product | undefined> {
    return this.products$.pipe(map((products) => products.find((p) => p.id == id)));
  }
}
