import { Injectable } from "@angular/core";
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../services/oauth.service';

/*
* Checks if the user is authenticated & authorized before routing to the component.
* Saves loading time.
*/

@Injectable()
export class AuthenticationCheck implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthService) { }

        canActivate() {
            let isLoggedIn = this.authenticationService.isLoggedInObs();
            isLoggedIn.subscribe((loggedin) => {
                if (!loggedin) {
                    this.authenticationService.startSigninMainWindow();
                }
            });
            return isLoggedIn;
    
        }

    // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    //     console.log(route);
    //     console.log(state.url);
    //     /*
    //      * If not authorized, redirect to identity server.
    //      */
    //     let isLoggedIn = this.authenticationService.isLoggedInObs();

    //     isLoggedIn.subscribe((loggedin) => {
    //         console.debug('AuthorizationCheck', `Authenticated ${loggedin}`);
    //         if (!loggedin) {
    //             //this.authenticationService.startSigninMainWindow();
    //             //this.router.navigateByUrl('/members/member-portal');

    //         }
    //     });

    //     return isLoggedIn;
    // }
}
