import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class OnlyNoAuthGuard implements CanActivate {

  constructor(private router: Router, protected authService: AuthService) {
    
  }

  canActivate(route: ActivatedRouteSnapshot) {
    if (!this.authService.isLoggedIn()) {
      return true;
    }
    // already logged in so redirect
    let redirectState = route.data['redirectTo'];
    this.router.navigate([redirectState]);
    return false;
  }
}
