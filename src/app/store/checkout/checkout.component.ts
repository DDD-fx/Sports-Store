import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrderRepositoryService } from '../../model/order-repository.service';
import { OrderService } from '../../model/order.service';
import { FormsModule, NgForm } from '@angular/forms';
import { AsyncPipe, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { RouterLink } from '@angular/router';
import { catchError, ignoreElements, Observable, of } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-checkout',
  templateUrl: 'checkout.component.html',
  styleUrls: ['checkout.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, NgIf, RouterLink, AsyncPipe, NgSwitch, NgSwitchCase, NgSwitchDefault],
})
export class CheckoutComponent {
  orderSent: boolean = false;

  submitted: boolean = false;

  submitResponse$: Observable<HttpResponse<OrderService>> | null = null;

  submitError$: Observable<HttpErrorResponse> | null = null;

  constructor(
    public orderRepositoryService: OrderRepositoryService,
    public orderService: OrderService
  ) {}

  submitOrder(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      this.submitResponse$ = this.orderRepositoryService.saveOrder(this.orderService);
      this.submitError$ = this.submitResponse$.pipe(
        ignoreElements(),
        catchError((err: HttpErrorResponse) => of(err))
      );

      this.orderService.clear();
      this.orderSent = true;
      this.submitted = false;
    }
  }
}
