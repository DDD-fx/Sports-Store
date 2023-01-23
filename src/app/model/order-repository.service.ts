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

  private loaded: boolean = false;

  constructor(private apiService: ApiService) {}

  loadOrders() {
    this.loaded = true;
    this.apiService.getOrders().subscribe((orders) => (this.orders = orders));
  }

  getOrders(): OrderService[] {
    if (!this.loaded) this.loadOrders();
    return this.orders;
  }

  saveOrder(order: OrderService): Observable<HttpResponse<OrderService>> {
    this.loaded = false;
    return this.apiService.saveOrder(order);
  }

  updateOrder(order: OrderService) {
    this.apiService.updateOrder(order).subscribe((order) => {
      this.orders.splice(
        this.orders.findIndex((o) => o.id == order.id),
        1,
        order
      );
    });
  }

  deleteOrder(id: number) {
    this.apiService.deleteOrder(id).subscribe((order) => {
      this.orders.splice(
        this.orders.findIndex((o) => id == o.id),
        1
      );
    });
  }
}
