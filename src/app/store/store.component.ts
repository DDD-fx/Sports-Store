import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProductRepositoryService } from '../model/product.repository';
import { Product } from '../model/product.model';
import { Cart } from '../model/cart.model';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreComponent {
  selectedCategory: string | undefined;

  productsPerPage = 4;

  selectedPage = 1;

  constructor(
    private repository: ProductRepositoryService,
    private cart: Cart
  ) {}

  get products(): Product[] {
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
      this.repository.getProducts(this.selectedCategory).length /
        this.productsPerPage
    );
  }

  addProductToCart(product: Product) {
    this.cart.addLine(product);
  }
}
