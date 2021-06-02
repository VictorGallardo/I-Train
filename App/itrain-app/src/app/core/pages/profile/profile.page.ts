import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IUser } from 'src/app/shared/interfaces/interfaces';
import { UiService } from 'src/app/shared/services/ui.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: IUser = {};

  constructor(

    private userService: UserService,
    private uiService: UiService,

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


}
