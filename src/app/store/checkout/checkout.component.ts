import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-checkout',
  template: `<div>
    <h3 class="bg-info p-1 text-white">Checkout Component</h3>
  </div>`,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutComponent {}
