import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-cart-detail',
  template: `<div>
    <h3 class="bg-info p-1 text-white">Cart Detail Component</h3>
  </div>`,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartDetailComponent {}
