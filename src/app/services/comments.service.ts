import { Inject, Injectable } from '@angular/core';

import { Observable } from "rxjs/Observable";
import { Http, Headers, RequestOptions } from "@angular/http";
import { HttpHeaders } from '@angular/common/http';

import "rxjs/add/operator/map";
import 'rxjs/add/operator/toPromise';

import { RequestService } from "./request.service";

import { Comment } from "./../models/commentModel";
import { Config } from "./../app.config";

@Injectable()
export class CommentsService {

  constructor(
    @Inject(Http) private _http: Http,
    private _requestService: RequestService
  ) { }

  //----------------------------------------------------------------------------
  // GET COMMENTS
  getComments(post_id: number){
    return this._http
      .get(
        `${Config.apiCommentsUrl}?post_id=${post_id}`, 
        this._requestService.AuthHeadersForGET()
      )
        .toPromise()
          .then(comments => comments.json())
          .catch(this.handleError);
  }

  //----------------------------------------------------------------------------
  // POST COMMENT
  saveComment(newComment: string, post_id: number) {

    return this._http.post(
      Config.apiCommentsUrl,
      this.makeCommentPayload(newComment, post_id),
      this._requestService.AuthHeadersForPOST())
        .toPromise()
        .then(response => response.json())
        .then((data) => {
          
          console.log('saveComment response =>');
          console.log(data);
          return data;
        })
        .catch(this.handleError);
  }

  //----------------------------------------------------------------------------
  // PRIVATE FUNCTION ----------------------------------------------------------
  //----------------------------------------------------------------------------
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  //----------------------------------------------------------------------------
  private makeCommentPayload(newComment: string, post_id: number): any {
    return JSON.stringify({
      content: newComment,
      post_id:post_id
    });
  }

}
