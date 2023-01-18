import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { StoreComponent } from '../store.component';

@Injectable({
  providedIn: 'root',
})
export class StoreFirstGuard implements CanActivate {
  private firstNavigation = true;

  constructor(private readonly router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.firstNavigation) {
      this.firstNavigation = false;
      if (route.component != StoreComponent) {
        void this.router.navigateByUrl('/');
        return false;
      }
    }
    return true;
  }
}
