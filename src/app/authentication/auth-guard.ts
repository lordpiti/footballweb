import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
// import { AuthenticationService } from './authentication.service';
// https://blog.thoughtram.io/angular/2016/07/18/guards-in-angular-2.html

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        // private authService: AuthenticationService,
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
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
