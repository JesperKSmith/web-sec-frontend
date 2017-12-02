import { Inject, Injectable } from '@angular/core';

import { Observable } from "rxjs/Observable";
import { Http, Headers, RequestOptions } from "@angular/http";
import { HttpHeaders } from '@angular/common/http';

import "rxjs/add/operator/map";
import 'rxjs/add/operator/toPromise';

import { RequestService } from "./request.service";

import { Post } from "./../models/postModel";
import { Config } from "./../app.config";

@Injectable()
export class PostsService {

  constructor(
    @Inject(Http) private _http: Http,
    private _requestService: RequestService
  ) { }

  //----------------------------------------------------------------------------
  // GET POSTS
  getPosts(){
    return this._http
      .get(Config.apiPostsUrl, this._requestService.AuthHeadersForGET())
        .toPromise()
          .then((posts) => posts.json())
          .catch(this.handleError);
  }

  //----------------------------------------------------------------------------
  // GET POSTS
  savePost(newPost: Post) {

    return this._http.post(
      Config.apiPostsUrl,
      this.makePostPayload(newPost),
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

  //----------------------------------------------------------------------------
  private makePostPayload(newPost: Post): any {
    return JSON.stringify({
      title: newPost.title,
      content: newPost.content
    });
  }

  //----------------------------------------------------------------------------
  // DUMMY DATA ----------------------------------------------------------------
  //----------------------------------------------------------------------------

  getDummyPosts(amount:number): any{

    let posts = [];

    for (var i = 0; i < amount; i++) {
        posts.push({
          id:i,
          title: `Post title nr:${i+1}`,
          content: `Post content content content content content content`,
          createdAt: new Date(),
          username: `Username`
        })
    }

    return posts;
  }

}
