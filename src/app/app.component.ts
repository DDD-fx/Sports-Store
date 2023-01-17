import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<app-store></app-store>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
