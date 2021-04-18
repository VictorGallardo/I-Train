import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  tempImages: string[] = [];

  post = {
    message: '',
    coords: null,
    position: false
  }

  constructor(
    private postsService: PostsService,
    private route: Router,
    private uiService: UiService
  ) { }


  // Crear post

  async crearPost() {

    const created = await this.postsService.crearPost(this.post); // Este crear post es del postsService
    console.log(this.post);

    if (created) {

      this.post = {  // Purga el post
        message: '',
        coords: null,
        position: false
      };

      this.route.navigateByUrl('main/tabs/tab1'); // Navega a tab1 y veremos el nuevo post

    } else {

      this.uiService.presentToast('Error al compartir')

      this.post = {  // Purga el post
        message: '',
        coords: null,
        position: false
      };

    }

  }

}
