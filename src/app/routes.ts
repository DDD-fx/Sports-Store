import { Routes } from '@angular/router';
import { StoreFirstGuard } from './store/guards/store-first.guard';
import { AuthGuard } from './auth/auth.guard';

export const ROUTES: Routes = [
  {
    path: 'store',
    loadComponent: () => import('./store/store.component').then((mod) => mod.StoreComponent),
    canActivate: [StoreFirstGuard],
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./store/cart-detail/cart-detail.component').then((mod) => mod.CartDetailComponent),
    canActivate: [StoreFirstGuard],
  },
  {
    path: 'checkout',
    loadComponent: () =>
      import('./store/checkout/checkout.component').then((mod) => mod.CheckoutComponent),
    canActivate: [StoreFirstGuard],
  },
  {
    path: 'admin',
    children: [
      {
        path: 'auth',
        loadComponent: () => import('./auth/auth/auth.component').then((mod) => mod.AuthComponent),
      },
      {
        path: 'main',
        loadComponent: () =>
          import('./auth/admin/admin.component').then((mod) => mod.AdminComponent),
        canActivate: [AuthGuard],
        children: [
          {
            path: 'products/:mode/:id',
            loadComponent: () =>
              import('./auth/admin/product-editor/product-editor.component').then(
                (mod) => mod.ProductEditorComponent
              ),
          },
          {
            path: 'products/:mode',
            loadComponent: () =>
              import('./auth/admin/product-editor/product-editor.component').then(
                (mod) => mod.ProductEditorComponent
              ),
          },

          {
            path: 'products',
            loadComponent: () =>
              import('./auth/admin/product-table/product-table.component').then(
                (mod) => mod.ProductTableComponent
              ),
          },
          {
            path: 'orders',
            loadComponent: () =>
              import('./auth/admin/order-table/order-table.component').then(
                (mod) => mod.OrderTableComponent
              ),
          },
          { path: '**', redirectTo: 'products' },
        ],
      },
      {
        path: '**',
        redirectTo: 'auth',
      },
    ],
    canActivate: [StoreFirstGuard],
  },
  {
    path: '**',
    redirectTo: '/store',
  },
];
