import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { StaticDataSourceService } from './static.datasource';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductRepositoryService {
  private products$: Observable<Product[]> = this.dataSource.getProducts();

  constructor(private dataSource: StaticDataSourceService) {}

  getProducts(category?: string): Observable<Product[]> {
    return this.products$.pipe(
      map((products) => products.filter((p) => category == undefined || category == p.category))
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
