import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { OrderRepositoryService } from '../../../model/order-repository.service';
import { OrderService } from '../../../model/order.service';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatTableModule, FormsModule, MatCheckboxModule, MatButtonModule, AsyncPipe],
})
export class OrderTableComponent {
  columnsToDisplay: string[] = ['name', 'zip', 'cart_p', 'cart_q', 'buttons'];

  private dataSource = new MatTableDataSource<OrderService>();

  public ordersAsMatTableDataSource$: Observable<MatTableDataSource<OrderService>> =
    this.repository.orders$.pipe(
      map((orders) => {
        const DS = this.dataSource;
        DS.data = orders;
        return DS;
      })
    );

  constructor(private repository: OrderRepositoryService) {
    this.dataSource.filter = 'true';
    this.dataSource.filterPredicate = (order, include) => {
      return !order.shipped || include.toString() == 'true';
    };
  }

  get includeShipped(): boolean {
    return this.dataSource.filter == 'true';
  }

  set includeShipped(include: boolean) {
    this.dataSource.filter = include.toString();
  }

  toggleShipped(order: OrderService) {
    order.shipped = !order.shipped;
    this.repository.updateOrder(order);
  }

  delete(id: number) {
    this.repository.deleteOrder(id);
  }
}
