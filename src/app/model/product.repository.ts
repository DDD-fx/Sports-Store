import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductRepositoryService {
  public products$: Observable<Product[]> = this.apiService.getProducts();

  constructor(private apiService: ApiService) {}

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

  saveProduct(product: Product) {
    // if (product.id == null || product.id == 0) {
    //   this.apiService.saveProduct(product).subscribe((p) => this.products.push(p));
    // } else {
    //   this.apiService.updateProduct(product).subscribe((p) => {
    //     this.products.splice(
    //       this.products.findIndex((p) => p.id == product.id),
    //       1,
    //       product
    //     );
    //   });
    // }
  }

  deleteProduct(id: number) {
    // this.apiService.deleteProduct(id).subscribe((p) => {
    //   this.products.splice(
    //     this.products.findIndex((p) => p.id == id),
    //     1
    //   );
    // });
  }
}
