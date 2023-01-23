import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-order-table',
  template: `<h3 style="padding-top: 10px">Order Table Placeholder</h3>`,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderTableComponent {}
