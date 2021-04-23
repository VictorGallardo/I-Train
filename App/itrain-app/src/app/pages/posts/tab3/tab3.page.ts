import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../interfaces/interfaces';
import { NgForm } from '@angular/forms';
import { UiService } from '../../../services/ui.service';
import { PostsService } from '../../../services/posts.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page implements OnInit {

  user: IUser = {}; // Este usuario está en privado para evitar que pueda ser leido desde fuera (no actualizado antes de guardar)

  constructor(

    private userService: UserService,
    private uiService: UiService,
    private postsService: PostsService

  ) { }


  ngOnInit(): void {


    this.user = this.userService.getUser();
    console.log(this.user);

  }


  // Actualizar usuario

  async update(formUpdate: NgForm) {

    if (formUpdate.invalid) { return };

    const updated = await this.userService.updateUser(this.user);
    console.info(updated);

    if (updated) {
      this.uiService.presentToast('Usuario actualizado correctamente')// Toast con mensaje de actualizado
    } else {
      this.uiService.presentToast('Error al actualizar usuario')
    }

  }

  // Logout 

  logout() {
    this.postsService.pagePosts = 0; // Esto es para reestablecer las páginas
    this.userService.logout();
  }

}
