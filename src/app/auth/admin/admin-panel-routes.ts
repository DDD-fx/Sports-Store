import { Route } from '@angular/router';
import { ProductEditorComponent } from './product-editor/product-editor.component';
import { ProductTableComponent } from './product-table/product-table.component';
import { OrderTableComponent } from './order-table/order-table.component';

export const ADMIN_PANEL_ROUTES: Route[] = [
  {
    path: 'products/:mode/:id',
    // loadChildren: () =>
    //   import('./product-editor/product-editor.component').then((m) => m.ProductEditorComponent),
    component: ProductEditorComponent,
  },
  {
    path: 'products/:mode',
    component: ProductEditorComponent,
  },

  {
    path: 'products',
    component: ProductTableComponent,
  },
  {
    path: 'orders',
    component: OrderTableComponent,
  },
  { path: '**', redirectTo: 'products' },
];
