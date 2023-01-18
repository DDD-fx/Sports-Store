import { Component } from '@angular/core';
import { Cart } from '../../model/cart.model';
import { CurrencyPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  standalone: true,
  // changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, CurrencyPipe],
})
export class CartSummaryComponent {
  constructor(public cart: Cart) {}
}
