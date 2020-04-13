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
            console.log("Is logged In");
            
            return true;
        }
        else {
            console.log("Is not logged in redirecting to login...");
            
            this.router.navigateByUrl('/login');
            return false;
        }
    }
}