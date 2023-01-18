import { Injectable } from '@angular/core';
import { OrderService } from './order.service';
import { StaticDataSourceService } from './static.datasource';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderRepositoryService {
  private orders: OrderService[] = [];

  constructor(private dataSource: StaticDataSourceService) {}

  getOrders(): OrderService[] {
    return this.orders;
  }

  saveOrder(order: OrderService): Observable<OrderService> {
    return this.dataSource.saveOrder(order);
  }
}
