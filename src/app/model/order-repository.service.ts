import { Injectable } from '@angular/core';
import { OrderService } from './order.service';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OrderRepositoryService {
  private orders: OrderService[] = [];

  constructor(private apiService: ApiService) {}

  getOrders(): OrderService[] {
    return this.orders;
  }

  saveOrder(order: OrderService): Observable<HttpResponse<OrderService>> {
    return this.apiService.saveOrder(order);
  }
}
