import { Component, Input } from '@angular/core';

import { Post } from './../../models/postModel';

import { CommentsService } from "../../services/comments.service";
import { Comment } from "../../models/commentModel";

@Component({
  selector: 'post-component',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  providers: [CommentsService]
})
export class PostComponent{

  @Input() post: Post;

  commentsVisible: boolean ;
  comments: Comment[];

  newComment: string;

  constructor(private _commentService: CommentsService){
    this.comments = [];
    this.newComment = "";
  }


  //----------------------------------------------------------------------------
  submitComment(): void {
    // SANITIZE COMMENT ?
    let sanitizedComment = this._sanitize(this.newComment);

    // SUBMIT COMMENT
    this._commentService.saveComment(sanitizedComment, this.post.id)
        .then(response => { 
            console.log('_commentService.saveComment received response');
            console.log(response);
            
            // @TODO: ADD COMMENT TO THE COMMENTS ARRAY
            let newComment = new Comment();
            newComment.id = 777;
            newComment.author = "John Galt";
            newComment.content = sanitizedComment;
            newComment.createdAt = new Date();
            
            this.comments.push(newComment)
        });

    // REST FORM
    this.newComment = "";
  }

  //----------------------------------------------------------------------------
  showComments(): void{
    this.commentsVisible = !this.commentsVisible;

    //Get Comments for the post PROD
    this._getCommentsForPost();
  }

  //============================================================================
  // Private Function
  _getCommentsForPost(): void{
      this._commentService.getComments(this.post.id)
      .then((comments) => {
          this.comments = comments;
          console.log('WE HAVE COMMENTS FOR POST ==> ' + this.post.id);
          console.log(this.comments);
        });
  }

  //----------------------------------------------------------------------------
  _getDummyComments(): Comment[]{

    let comments: Comment[] = [];

    for (var i = 0; i < 7; i++) {
      
      let comment = new Comment();
      comment.author = `John Galt #${i}`;
      comment.content = `If you're hotter than me, then that means I'm cooler than you.`;
      comment.createdAt = new Date();

      comments.push(comment);
    }

    return comments;
  }
  //----------------------------------------------------------------------------
  _sanitize(dataToSanitize: string): string {

      // do somesanitization

      return dataToSanitize;
  }
}
