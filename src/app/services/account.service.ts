import { Inject, Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from "@angular/http";
import { HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { RequestService } from "./request.service";

import { Config } from "./../app.config";

@Injectable()
export class AccountService {

  constructor(
    @Inject(Http) private _http: Http,
    private _requestService: RequestService
  ) { }

  //----------------------------------------------------------------------------
  // GET PRFERENCES
  getPreferences() {
    return this._http
      .get("PREFERENCES URL HERE", this._requestService.AuthHeadersForGET())
      .toPromise()
      .then((preferences) => preferences.json())
      .catch(this.handleError);
  }

  //----------------------------------------------------------------------------
  // UPDATE USER PICTURE
  uploadPRofilePicture(base64picture: string) {

    // @TODO change API URL
    return this._http.post(
      Config.devApiPostRequestUrl,
      this._makePicturePayload(base64picture),
      this._requestService.AuthHeadersForPOST()
    )
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  //----------------------------------------------------------------------------
  // UPDATE USER PREFERENCES
  updateUserPreferences(preferences: any[]){

    // @TODO change API URL
    return this._http.post(
      Config.devApiPostRequestUrl,
      this._makePreferencesPayload(preferences),
      this._requestService.AuthHeadersForPOST()
    )
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  //----------------------------------------------------------------------------
  // PRIVATE FUNCTION ----------------------------------------------------------
  //----------------------------------------------------------------------------
  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

  private _makePicturePayload(base64picture: string): any {
    return JSON.stringify(
      {
        picture: base64picture
      }
    );
  }

  private _makePreferencesPayload(preferences: any){
    return JSON.stringify(
      {
        preferences: preferences
      }
    );
  }

  //----------------------------------------------------------------------------
  // DUMMY DATA       ----------------------------------------------------------
  //----------------------------------------------------------------------------
  getFriends(amount: number) {

    let friends = [];

    for (var i = 0; i < amount; i++) {
      friends.push({
        name: `Friend #${i}`
      })
    }

    return friends;
  }

}
