import { Component, OnInit } from '@angular/core';

import { PostsService } from "../../services/posts.service";
import { Post } from "../../models/postModel";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [PostsService]
})
export class MainComponent implements OnInit {

  posts: Post[] = [];

  constructor(private _postService: PostsService) { }

  ngOnInit() {
    this.getPosts();
  }

  //------------------------------------------------
  // GET POSTS
  getPosts(): void {
    this._postService.getPosts()
      .then((posts) => {
        console.log('POST');
        this.posts = posts;
        console.log(this.posts);
        console.table(this.posts);
      });
  }
}
