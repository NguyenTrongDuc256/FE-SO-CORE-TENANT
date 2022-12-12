import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree  } from '@angular/router';
import { AuthService } from 'src/app/modules/auth';
import {GeneralService} from "../../../_services/general.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private generalService: GeneralService,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // this.generalService.changeValueSearch(0)
    const currentUser = localStorage.getItem('User');
    const currentLayout = localStorage.getItem('currentLayout');

    if (currentUser && currentLayout) {
      // logged in so return true
      return true;
    } else {
      // not logged in so redirect to login page with the return url
      if(!currentUser) {
        this.router.navigate(['/auth/login'], {queryParams: {returnUrl: state.url}});
        return false;
      }
      if(!currentLayout) {
        this.router.navigate(['/auth/login/layout']);
        return false;
      }
    }
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const currentUser = localStorage.getItem('User');
    if (!currentUser) {
      console.log('You are not allowed to view this page');
      return false;
    }

    return true;
  }
}
