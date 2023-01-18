import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoreComponent } from './store/store.component';

@Component({
  selector: 'app-root',
  template: '<app-store></app-store>',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [StoreComponent],
})
export class AppComponent {}
