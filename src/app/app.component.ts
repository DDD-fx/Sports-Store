import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoreComponent } from './store/store.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [StoreComponent, RouterOutlet],
})
export class AppComponent {}
