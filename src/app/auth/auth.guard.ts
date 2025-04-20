import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { environment } from '../../environment/environment';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // ✅ Bypass auth check when in test mode (e.g., Cypress)
    if (environment.testMode) {
      return true;
    }

    const token = localStorage.getItem('jwt');
    if (token) {
      return true;
    }

    // No token → redirect to login
    this.router.navigate(['auth/login']);
    return false;
  }
}
