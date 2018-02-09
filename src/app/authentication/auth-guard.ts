import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
// import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        // private authService: AuthenticationService,
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        debugger;
        const redirectUrl = route.data.redirectUrl || '/';
        // if (this.authService.isAuthenticated()) {
        if (localStorage.getItem('token')) {
            return true;
        } else {
            this.router.navigate([redirectUrl]);
            return false;
        }
    }
}
