import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { ProductRepositoryService } from '../../../model/product.repository';
import { Product } from '../../../model/product.model';
import { map, Observable } from 'rxjs';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatTableModule,
    MatButtonModule,
    RouterLink,
    CurrencyPipe,
    AsyncPipe,
    MatPaginatorModule,
  ],
})
export class ProductTableComponent implements AfterViewInit {
  public columnsToDisplay: string[] = ['id', 'name', 'category', 'price', 'buttons'];

  private dataSource = new MatTableDataSource<Product>();

  public productsAsMatTableDataSource$: Observable<MatTableDataSource<Product>> =
    this.repository.products$.pipe(
      map((products) => {
        const DS = this.dataSource;
        DS.data = products;
        return DS;
      })
    );

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(private repository: ProductRepositoryService) {}

  ngAfterViewInit() {
    if (this.paginator) this.dataSource.paginator = this.paginator;
  }

  deleteProduct(id: number) {
    this.repository.deleteProduct(id);
  }
}
