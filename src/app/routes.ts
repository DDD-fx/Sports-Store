import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: 'store',
    loadComponent: () =>
      import('./store/store.component').then((mod) => mod.StoreComponent),
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./store/cart-detail/cart-detail.component').then(
        (mod) => mod.CartDetailComponent
      ),
  },
  {
    path: 'checkout',
    loadComponent: () =>
      import('./store/checkout/checkout.component').then(
        (mod) => mod.CheckoutComponent
      ),
  },
  {
    path: '**',
    redirectTo: '/store',
  },
];
