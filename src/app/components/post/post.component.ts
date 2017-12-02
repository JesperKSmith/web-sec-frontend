import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Post } from './../../models/postModel';

import { CommentsService } from "../../services/comments.service";
import { AlertService } from "../../services/alert-service.service";
import { Comment } from "../../models/commentModel";

@Component({
  selector: 'post-component',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  providers: [CommentsService]
})
export class PostComponent{

  @Input() post: Post;

  commentsVisible: boolean;
  comments: Comment[];

  newComment: string;

  constructor(
    private _commentService: CommentsService,
    private _alert: AlertService,
    private _router: Router
  ) {
      this.comments = [];
      this.newComment = "";
  }


  //----------------------------------------------------------------------------
  submitComment(): void {
    // SANITIZE COMMENT ?
    let sanitizedComment = this._sanitize(this.newComment);

    // SUBMIT COMMENT
    this._commentService.saveComment(sanitizedComment, this.post.id)
      .then(commetResponse => {

        // Feedback for the user
        this._alert.success(
          "Success",
          "Comment successfully created!"
        )

        // Create and render comment
        let newComment = this._mapResponseToComment(commetResponse);
        this.comments.push(newComment)

        // Reset the form
        this.newComment = "";
      });

    
  }

  //----------------------------------------------------------------------------
  showComments(): void {
    this.commentsVisible = !this.commentsVisible;

    //Get Comments for the post PROD
    this._getCommentsForPost();
  }
  //----------------------------------------------------------------------------
  goToUserProfile(): void{
    this._router.navigate([`/user/${this.post.username}`]);
  }

  //============================================================================
  // Private Function
  _getCommentsForPost(): void {
    this._commentService.getComments(this.post.id)
      .then((comments) => {
        this.comments = comments;
      });
  }

  //----------------------------------------------------------------------------
  _mapResponseToComment(comment: any): Comment {

    let newComment = new Comment();
    newComment.id = comment.id;
    newComment.username = comment.username;
    newComment.content = comment.content;
    newComment.createdAt = comment.createdAt;

    return newComment;
  }

  //----------------------------------------------------------------------------
  _sanitize(dataToSanitize: string): string {
    return dataToSanitize;
  }


}
