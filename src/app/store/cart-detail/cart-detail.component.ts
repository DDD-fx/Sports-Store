import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CartService } from '../../model/cart.service';
import { CurrencyPipe, NgForOf, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-detail',
  templateUrl: 'cartDetail.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe, RouterLink, NgForOf, NgIf],
})
export class CartDetailComponent {
  constructor(public cart: CartService) {}
}
