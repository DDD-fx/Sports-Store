import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { Product } from '../model/product.model';
import { OrderService } from '../model/order.service';

const PROTOCOL = 'http';
const PORT = 3500;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + 'products').pipe(shareReplay(1));
  }

  saveOrder(order: OrderService): Observable<HttpResponse<OrderService>> {
    return this.http
      .post<OrderService>(this.baseUrl + 'orders', order, { observe: 'response' })
      .pipe(shareReplay(1));
  }
}

// If you were making an HTTP request for example, you would need to make sure to cache
// the observable and share the response (e.g., with shareReplay) so that you don't actually
// fire off two separate requests — one for your main data stream, and one for the additional
// error stream:
