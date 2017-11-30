import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from './auth.service';
import { AlertService } from './alert-service.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
    private alert: AlertService,
  ) { }

  //----------------------------------------------------------------------------

  canActivate() {
    return this.authenticationCheck();
  }

  //----------------------------------------------------------------------------

  authenticationCheck(): boolean {

    let isAthenticated = this.authService.isAuthenticated();
    if (!isAthenticated) {
      this.alert.error("Not Authorized", "Please login in order to access requested resource");
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1500);
      return false;
    }
    return isAthenticated;
  }

  //----------------------------------------------------------------------------
}