import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrderRepositoryService } from '../../model/order-repository.service';
import { OrderService } from '../../model/order.service';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: 'checkout.component.html',
  styleUrls: ['checkout.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, NgIf, RouterLink],
})
export class CheckoutComponent {
  orderSent: boolean = false;

  submitted: boolean = false;

  constructor(public repository: OrderRepositoryService, public order: OrderService) {}

  submitOrder(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      this.repository.saveOrder(this.order).subscribe((order) => {
        this.order.clear();
        this.orderSent = true;
        this.submitted = false;
      });
    }
  }
}
