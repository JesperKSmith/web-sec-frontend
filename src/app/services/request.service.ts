import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";

import { AuthService } from './auth.service';

@Injectable()
export class RequestService {

   constructor(private authService: AuthService) {}

  AuthHeadersForGET() {
    let headers = new Headers();
    headers.append('Authorization', `Token=${this._getToken()}`);
    return new RequestOptions({ headers: headers });
  }

  AuthHeadersForPOST() {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append('Authorization', `Token=${this._getToken()}`);
    return new RequestOptions({ headers: headers });
  }

  //----------------------------------------------------------------------------
  // PRIVATE FUNCTIONS

  private _getToken(): string {
    let tokenData = this.authService.getToken();
    return tokenData.token;
  }
}
