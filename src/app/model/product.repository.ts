import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductRepositoryService {
  private products$: Observable<Product[]> = this.dataSource.getProducts();

  private categories: string[] = [];

  constructor(private dataSource: ApiService) {
    // const products$ = dataSource.getProducts();
    // dataSource.getProducts().subscribe((data) => {
    //   console.log(data);
    //   this.products = data;
    //   this.categories = data
    //     .map((p) => p.category ?? '(None)')
    //     .filter((c, index, array) => array.indexOf(c) == index)
    //     .sort();
    // });
  }

  getProducts(category?: string): Product[] {
    console.log(this.products);
    return this.products.filter((p) => category == undefined || category == p.category);
  }

  getCategories(): string[] {
    return this.categories;
  }

  getProduct(id: number): Product | undefined {
    return this.products.find((p) => p.id == id);
  }
}
