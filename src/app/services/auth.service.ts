import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Http, Headers } from "@angular/http";
import { Router }    from '@angular/router';

import { AlertService } from './alert-service.service';
import { Config } from "./../app.config";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

  constructor( 
    private router: Router,
    @Inject(Http) private _http: Http
  ) { }

  // LOGIN
  //-----------------------------------------------------------
  login(credentials: any) {

    let dataPayload = JSON.stringify({
      username: credentials.username,
      password: credentials.password
    });

    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this._http
      .post(Config.apiLoginUrl, dataPayload, { headers })
      .toPromise()
      .then(response => response.json())
      .then(data => {
        this.setToken(data);
        this.router.navigate(['/home']);
      })
      .catch(this.handleError);
  }
  //-----------------------------------------------------------

  register(userData: any) {
    let dataPayload = JSON.stringify({
      username: userData.username,
      password: userData.password
    });

    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this._http
      .post(Config.apiRegisterUrl, dataPayload, { headers })
      .toPromise()
      .then(response => response.json())
      .then(data => {
        this.setToken(data);
        return data; 
      })
      .catch(this.handleError);
  }

  //-----------------------------------------------------------

  isAuthenticated(): boolean {
    return this.validateToken();
  }

  //-----------------------------------------------------------
  validateToken(): boolean {
    let token = this.getToken();

    if (token.token === null || token.tta === null) { return false; }

    // check if token.token = has value
    let isValidToken = (token.token.length == 128 || token.token.length == 127);

    //check if token.tta still valid
    let isValidTta = this.checkTokenTTA(token.tta);

    return isValidToken && isValidTta;
  }
  //-----------------------------------------------------------
  getToken(): any {
    return {
      token: localStorage.getItem("token"),
      tta: localStorage.getItem("tta"),
    };
  }
  //------------------------------------------------------------------
  setToken(data: any): void {
    localStorage.setItem('token', data.token);
    localStorage.setItem('tta', data.timeAlive);
  }
  //------------------------------------------------------------------
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('tta');
    this.router.navigate(['/login']);
  }
  //------------------------------------------------------------------
  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
  //------------------------------------------------------------------
  private checkTokenTTA(timestamp: string): boolean {

    if (typeof timestamp == 'undefined') { return false; }

    let now = new Date();
    let tokenExpiration = new Date(timestamp);

    // TTA should be bigger(later) than 'now' 
    return now < tokenExpiration;
  }

}
