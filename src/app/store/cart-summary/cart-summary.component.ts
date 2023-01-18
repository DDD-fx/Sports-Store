import { Component } from '@angular/core';
import { CartService } from '../../model/cart.service';
import { CurrencyPipe, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  standalone: true,
  // changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, CurrencyPipe, RouterLink],
})
export class CartSummaryComponent {
  constructor(public cart: CartService) {}
}
