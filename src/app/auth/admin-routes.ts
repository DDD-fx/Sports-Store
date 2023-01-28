import { Route } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth.guard';
import { AdminComponent } from './admin/admin.component';

export const ADMIN_ROUTES: Route[] = [
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'main',
    component: AdminComponent,
    // children: ADMIN_PANEL_ROUTES,
    loadChildren: () => import('./admin/admin-panel-routes').then((mod) => mod.ADMIN_PANEL_ROUTES),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];
