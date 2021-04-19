import { Component, OnInit } from '@angular/core';
import { IUser } from '../../interfaces/interfaces';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page implements OnInit {

  user: IUser = {}; // Este usuario está en privado para evitar que pueda ser leido desde fuera (no actualizado antes de guardar)

  constructor(

    private userService: UserService,
    private uiService: UiService

  ) { }


  ngOnInit(): void {

    this.user = this.userService.getUser(); // Cargamos los datos del usuario
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


  logout() {

  }

}
