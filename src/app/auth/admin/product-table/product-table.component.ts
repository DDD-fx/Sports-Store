import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  IterableDiffer,
  IterableDiffers,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { ProductRepositoryService } from '../../../model/product.repository';
import { Product } from '../../../model/product.model';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatTableModule, MatButtonModule, RouterLink, CurrencyPipe, AsyncPipe],
})
export class ProductTableComponent implements DoCheck {
  columnsToDisplay: string[] = ['id', 'name', 'category', 'price', 'buttons'];

  private dataSource = new MatTableDataSource<Product>();

  productsAsMatTableDataSource$: Observable<MatTableDataSource<Product>> =
    this.repository.products$.pipe(
      map((products) => {
        const DS = this.dataSource;
        DS.data = products;
        return DS;
      })
    );

  differ!: IterableDiffer<Product>;

  constructor(
    private repository: ProductRepositoryService,
    // private apiService: ApiService,
    differs: IterableDiffers
  ) {
    // this.differ = differs.find(this.repository.getProducts()).create();
  }

  ngDoCheck() {
    // let changes = this.differ?.diff(this.repository.getProducts());
    // if (changes != null) {
    //   this.dataSource.data = this.repository.getProducts();
    // }
  }

  deleteProduct(id: number) {
    this.repository.deleteProduct(id);
  }
}
