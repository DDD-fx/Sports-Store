import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { CartService } from '../../model/cart.service';
import { CurrencyPipe, NgForOf, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ConnectionService } from '../../pwa/connection.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-cart-detail',
  templateUrl: 'cartDetail.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe, RouterLink, NgForOf, NgIf],
})
export class CartDetailComponent implements OnDestroy {
  public connected: boolean = true;

  private destroy$ = new Subject<boolean>();

  constructor(public cart: CartService, private connection: ConnectionService) {
    this.connected = this.connection.connected;
    connection.changes
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => (this.connected = state));
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
