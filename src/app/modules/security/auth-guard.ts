import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from "@angular/router";
import { Observable } from 'rxjs';
import { Session } from './session';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private session: Session, private router: Router) {

    }
    
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
        if (this.session.isLoggedIn()) {
            return true;
        }
        else {
            this.router.navigateByUrl('/login');
            return false;
        }
    }
}