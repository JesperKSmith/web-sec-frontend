import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Post } from "../../models/postModel";
import { PostsService } from "../../services/posts.service";
import { AlertService } from "../../services/alert-service.service";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
  providers: [
    PostsService,
    AlertService
  ]
})
export class CreatePostComponent {

  postForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _postsService: PostsService,
    private _alert: AlertService,
    private _router: Router
  ) {
    this.createForm();
  }

  // ===========================================================================
  // FUNCTIONS  

  submitForm() {
    
    // @TODO: SANITIZE INPUT ?
    this._postsService.savePost(this.makeNewPost())
        .then(response => {
          // Clear the form
          this.postForm.reset();
          // Inform user
          this._alert.success(
            "Success",
            `Post '${response.title}' is successfully created!`
          );
          // Redirect to posts
          this._router.navigate(['/home']);
        })
  }
  // ---------------------------------------------------------------------------

  createForm() {
    this.postForm = this._formBuilder.group({
      title: [
        '', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(20)])
      ],
      content: [
        '', Validators.compose([Validators.required, Validators.minLength(5)])
      ]
    });
  }
  // ---------------------------------------------------------------------------

  // FORM GETTERS
  get title() { return this.postForm.get('title'); }
  get content() { return this.postForm.get('content'); }

  // ---------------------------------------------------------------------------
  isValidField(fieldName: string) {
    return this.postForm.get(fieldName).status == 'VALID';
  }

  // ---------------------------------------------------------------------------
  isValidForm() {
    return this.postForm.status == 'VALID';
  }

  // ---------------------------------------------------------------------------
  makeNewPost(): Post {

    let newPost = new Post();
    newPost.title = this.postForm.value.title;
    newPost.content = this.postForm.value.content;

    return newPost;
  }

}
