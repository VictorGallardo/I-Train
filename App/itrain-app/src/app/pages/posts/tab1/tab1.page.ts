import { IPost } from '../../../interfaces/interfaces';
import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../../services/posts.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  posts: IPost[] = [];
  enabled = true;

  constructor(private postsService: PostsService) { }

  ngOnInit() {

    this.nexts();
    this.postsService.newPost.subscribe(post => { // Se subscribe al event emiter (newPost) del postService

      // Ahora lo inserto en el array de posts
      this.posts.unshift(post) // El unshift inserta el post en la primera posición

    })

  }

  // Refrescar imagenes y posts
  doRefresh(event) {

    this.nexts(event, true);
    this.enabled = true;
    this.posts = [];

  }

  // Infinite scroll
  nexts(event?, pull: boolean = false) {

    this.postsService.getPosts(pull)
      .subscribe(resp => {
        console.log(resp);
        this.posts.push(...resp.posts);

        if (event) {
          event.target.complete();

          if (resp.posts.length === 0)
            event.target.disabled = false;
        }

      });

  }


}
