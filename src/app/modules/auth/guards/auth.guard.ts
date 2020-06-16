import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, protected authService: AuthService) {
    
  }

  canActivate() {
    if (this.authService.isLoggedIn()) {
      return true;
    }
    
    this.router.navigateByUrl('auth/signIn');
    return false;
  }
}
