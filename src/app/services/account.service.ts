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
  // GET MY PREFERENCES
  getMyPreferences() {
    return this._http
      .get(Config.apiAccountPreferencesUrl, this._requestService.AuthHeadersForGET())
      .toPromise()
      .then((preferences) => preferences.json())
      .catch(this.handleError);
  }
  //----------------------------------------------------------------------------
  // GET PREFERENCE TYPES
  getPreferenceTypes(){
    return this._http
      .get(Config.apiAccountPreferenceTypesUrl, this._requestService.AuthHeadersForGET())
      .toPromise()
      .then((preferenceTypes) => preferenceTypes.json())
      .catch(this.handleError);
  }

  //----------------------------------------------------------------------------
  // UPDATE USER PICTURE
  uploadProfilePicture(base64picture: string) {

    return this._http.post(
      Config.apiPictureUrl,
      this._makePicturePayload(base64picture),
      this._requestService.AuthHeadersForPOST()
    )
      .toPromise()
      .then(response => {
        if(response.status === 200){
           return Promise.resolve();
        }
      })
      .catch(this.handleError);
  }
  //----------------------------------------------------------------------------
  // UPDATE USER PREFERENCES
  updateUserPreferences(preference: any){

    return this._http.post(
      Config.apiAccountPreferencesUrl,
      this._makePreferencesPayload(preference),
      this._requestService.AuthHeadersForPOST()
    )
      .toPromise()
      .then(response => {
        if(response.status === 200){
           return Promise.resolve();
        }
      })
      .catch(this.handleError);
  }
  //----------------------------------------------------------------------------
  // GET MY PICTURE
  getMyPicture(){
    return this._http.get(
      Config.apiPictureUrl,
      this._requestService.AuthHeadersForGET()
    )
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }
   //----------------------------------------------------------------------------
  // GET USER PICTURE
  getUserPicture(user_id:number){
    return this._http.get(
      `${Config.apiPictureUrl}?user_id=${user_id}`,
      this._requestService.AuthHeadersForGET()
    )
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }
  //----------------------------------------------------------------------------
  // PRIVATE FUNCTIONS ----------------------------------------------------------
  //----------------------------------------------------------------------------
  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
  //----------------------------------------------------------------------------
  private _makePicturePayload(base64picture: string): any {
    return JSON.stringify(
      {
        picture: base64picture
      }
    );
  }
  //----------------------------------------------------------------------------
  private _makePreferencesPayload(preferences:any){
    return JSON.stringify(
      {
        type_id: preferences.type_id,
        level_id: preferences.level_id,
      }
    );
  }
  //----------------------------------------------------------------------------
}
