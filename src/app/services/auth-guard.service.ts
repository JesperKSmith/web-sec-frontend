import { Injectable }     from '@angular/core';
import { CanActivate, Router }    from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService) {}
    
  //----------------------------------------------------------------------------
  
  canActivate() {
    return this.authenticationCheck();
  }

  //----------------------------------------------------------------------------

  authenticationCheck(): boolean{

    let isAthenticated = this.authService.isAuthenticated();
    console.log('isAthenticated');
    console.log(isAthenticated);
    if(!isAthenticated){
      this.router.navigate(['/login']);
      return false;
    }
    return isAthenticated;
  }

  //----------------------------------------------------------------------------
}