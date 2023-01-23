import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-product-editor',
  template: `<h3 style="padding-top: 10px">Product Editor Placeholder</h3>`,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductEditorComponent {}
