import { Routes } from '@angular/router';
import { StoreFirstGuard } from './store/guards/store-first.guard';

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
    path: '**',
    redirectTo: '/store',
  },
];
