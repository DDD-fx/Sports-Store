import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { StaticDataSourceService } from './static.datasource';

@Injectable({
  providedIn: 'root',
})
export class ProductRepositoryService {
  private products: Product[] = [];

  private categories: string[] = [];

  constructor(private dataSource: StaticDataSourceService) {
    dataSource.getProducts().subscribe((data) => {
      this.products = data;
      this.categories = data
        .map((p) => p.category ?? '(None)')
        .filter((c, index, array) => array.indexOf(c) == index)
        .sort();
    });
  }

  getProducts(category?: string): Product[] {
    return this.products.filter(
      (p) => category == undefined || category == p.category
    );
  }

  getCategories(): string[] {
    return this.categories;
  }

  getProduct(id: number): Product | undefined {
    return this.products.find((p) => p.id == id);
  }
}
