import { Injectable } from '@angular/core';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  public id?: number;

  public name?: string;

  public address?: string;

  public city?: string;

  public state?: string;

  public zip?: string;

  public country?: string;

  public shipped: boolean = false;

  constructor(public cart: CartService) {}

  clear() {
    this.id = undefined;
    this.name = this.address = this.city = undefined;
    this.state = this.zip = this.country = undefined;
    this.shipped = false;
    this.cart.clear();
  }
}
