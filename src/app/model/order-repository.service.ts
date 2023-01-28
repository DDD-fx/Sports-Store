import { Injectable, OnDestroy } from '@angular/core';
import { OrderService } from './order.service';
import { BehaviorSubject, Observable, shareReplay, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { ApiService } from '../api/api.service';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OrderRepositoryService implements OnDestroy {
  private _updateOrders$ = new BehaviorSubject<void>(undefined);

  public orders$: Observable<OrderService[]> = this._updateOrders$.pipe(
    switchMap(() => this.loadOrders()),
    tap((orders) => (this.orders = orders)),
    shareReplay(1)
  );

  private orders: OrderService[] = [];

  // private loaded: boolean = false;

  private destroy$ = new Subject<boolean>();

  constructor(private apiService: ApiService) {}

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  loadOrders(): Observable<OrderService[]> {
    // this.loaded = true;
    return this.apiService.getOrders();
  }

  // getOrders(): OrderService[] {
  //   if (!this.loaded) this.loadOrders();
  //   return this.orders;
  // }

  saveOrder(order: OrderService): Observable<HttpResponse<OrderService>> {
    // this.loaded = false;
    return this.apiService.saveOrder(order).pipe(tap(() => this._updateOrders$.next()));
  }

  updateOrder(order: OrderService): void {
    this.apiService
      .updateOrder(order)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this._updateOrders$.next());
  }

  deleteOrder(id: number): void {
    this.apiService
      .deleteOrder(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this._updateOrders$.next());
  }
}
