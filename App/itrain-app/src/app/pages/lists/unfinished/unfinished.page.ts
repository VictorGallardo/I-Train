import { Component, OnInit } from '@angular/core';
import { ListsService } from '../../../services/lists.service';
import { IUser, IList } from '../../../interfaces/interfaces';
import { UserService } from '../../../services/user.service';
import { UiService } from 'src/app/services/ui.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-unfinished',
  templateUrl: './unfinished.page.html',
  styleUrls: ['./unfinished.page.scss'],
})
export class UnfinishedPage implements OnInit {

  user: IUser = {};
  lists: IList[] = [];

  list = {
    title: '',
    completed: false
  }


  constructor(
    private listsService: ListsService,
    private userService: UserService,
    private alertCtrl: AlertController,
    private uiService: UiService,
  ) { }

  ngOnInit(): void {

    // this.userService.loadToken()
    this.user = this.userService.getUser();
    console.log(this.user);

    // Cargamos las listas 
    this.listsService.getLists() // getList de listService // Esto me devuelve las listas del usuario logeado
      .subscribe(resp => {
        console.log(resp);
        this.lists.push(...resp.lists); // Cargamos el array del lists

      });

    this.listsService.newList.subscribe(list => {
      this.lists.unshift(list)
    })
  }

  async createdList() {

    console.log(this.list);
    const created = await this.listsService.createdList(this.list);

    this.list = {
      title: '',
      completed: false
    }

    //  this.router.navigateByUrl(`/tabs/tab1/agregar/${listaId}`)

  }

  async addList() {

    const alert = await this.alertCtrl.create({
      header: 'Nueva lista',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Nombre de la lista '
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
          }
        },
        {
          text: 'Crear',
          handler: (data) => {

            if (data.title.length > 0) {
              this.list.title = data.title
              this.createdList();
              console.log(this.list);
            } else {
              this.uiService.presentToast('Debe escribir un nombre para la lista');
            }


          }
        }
      ]
    });
    await alert.present();
  }

}
