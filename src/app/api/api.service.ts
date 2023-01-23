import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map, Observable, shareReplay } from 'rxjs';
import { Product } from '../model/product.model';
import { OrderService } from '../model/order.service';

const PROTOCOL = 'http';
const PORT = 3500;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl: string;

  auth_token?: string;

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

  authenticate(user: string, pass: string): Observable<boolean> {
    return this.http
      .post<any>(this.baseUrl + 'login', {
        name: user,
        password: pass,
      })
      .pipe(
        map((response) => {
          this.auth_token = response.success ? response.token : null;
          return response.success;
        }),
        shareReplay(1)
      );
  }

  saveProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl + 'products', product, this.getOptions());
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(
      `${this.baseUrl}products/${product.id}`,
      product,
      this.getOptions()
    );
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.baseUrl}products/${id}`, this.getOptions());
  }

  getOrders(): Observable<OrderService[]> {
    return this.http.get<OrderService[]>(this.baseUrl + 'orders', this.getOptions());
  }

  deleteOrder(id: number): Observable<OrderService> {
    return this.http.delete<OrderService>(`${this.baseUrl}orders/${id}`, this.getOptions());
  }

  updateOrder(order: OrderService): Observable<OrderService> {
    return this.http.put<OrderService>(
      `${this.baseUrl}orders/${order.id}`,
      order,
      this.getOptions()
    );
  }

  private getOptions() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer<${this.auth_token}>`,
      }),
    };
  }
}

// If you were making an HTTP request for example, you would need to make sure to cache
// the observable and share the response (e.g., with shareReplay) so that you don't actually
// fire off two separate requests — one for your main data stream, and one for the additional
// error stream:
