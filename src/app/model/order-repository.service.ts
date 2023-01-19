import { Injectable } from '@angular/core';
import { OrderService } from './order.service';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class OrderRepositoryService {
  private orders: OrderService[] = [];

  constructor(private dataSource: ApiService) {}

  getOrders(): OrderService[] {
    return this.orders;
  }

  saveOrder(order: OrderService): Observable<OrderService> {
    return this.dataSource.saveOrder(order);
  }
}
