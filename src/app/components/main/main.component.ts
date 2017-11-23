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
    //this.getDummyPosts();
  }

  //------------------------------------------------
  // GET POSTS
  getPosts(): void {
    this._postService.getPosts()
      .then((posts) => {
        this.posts = posts;
        console.log('WE HAVE POSTS ==> ');
        console.log(this.posts);
      });
  }

  //------------------------------------------------
  // GET DUMMy POSTS
  getDummyPosts(): void {

    for (var i = 0; i < 25; i++) {

      let post = new Post();
      post.id = i;
      post.title = `Post #${i} title`;
      post.content = `Post #${i} content.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`;
      post.createdAt = new Date().toString();

      this.posts.push(post);
    }
  }
  //------------------------------------------------

}
