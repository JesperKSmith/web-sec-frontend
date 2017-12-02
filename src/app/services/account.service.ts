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
  getPreferences(){
    return this._http
      .get("PREFERENCES URL HERE", this._requestService.AuthHeadersForGET())
        .toPromise()
          .then((preferences) => preferences.json())
          .catch(this.handleError);
  }


  //----------------------------------------------------------------------------
  // PRIVATE FUNCTION ----------------------------------------------------------
  //----------------------------------------------------------------------------
  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

  //----------------------------------------------------------------------------
  // DUMMY DATA       ----------------------------------------------------------
  //----------------------------------------------------------------------------
  getFriends(amount:number){

    let friends = [];

    for (var i = 0; i < amount; i++) {
      friends.push({
        name: `Friend #${i}`
      })
    }

    return friends;
  }

}
