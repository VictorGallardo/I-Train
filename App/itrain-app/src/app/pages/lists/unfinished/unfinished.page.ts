import { Component, Input, OnInit, } from '@angular/core';
import { ListsService } from '../../../services/lists.service';
import { IList } from '../../../interfaces/interfaces';
import { UiService } from 'src/app/services/ui.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unfinished',
  templateUrl: './unfinished.page.html',
  styleUrls: ['./unfinished.page.scss'],
})
export class UnfinishedPage implements OnInit {

  lists: IList[] = [];
  enabled = true;

  list = {
    title: '',
    completed: false,
  }

  listId: string;

  constructor(
    private listsService: ListsService,
    private alertCtrl: AlertController,
    private uiService: UiService,
    private router: Router
  ) { }

  ngOnInit() {

    this.nextsItems();

    this.listsService.newList.subscribe(list => {
      this.lists.unshift(list)
      this.listId = list._id;
    })

  }

  // Cargar las páginas
  loadLists(event) {

    this.nextsItems(event, true);
    this.enabled = true;
    this.lists = []

  }

  // Infinite Scroll
  nextsItems(event?, pull: boolean = false) {

    this.listsService.getLists(pull) // getList de listService // Esto me devuelve las listas del usuario logeado
      .subscribe(resp => {
        console.log(resp);
        this.lists.push(...resp.lists); // Cargamos el array del lists
        // Así puedo obtener el atributo que quiera ---------
        // console.log(resp.lists[0]._id); // El id de la lista posicion 0 o la que sea
        // console.log(resp.lists[0].user._id); // El email del usuario
        //---------------------------------------------------

        if (event) {
          event.target.complete();

          if (resp.lists.length === 0) {
            event.target.disabled = false;
          }
        }
      });

  }

  // Crear nueva lista
  async createdList() {

    console.log(this.list);
    await this.listsService.createdList(this.list);

    this.list = {
      title: '',
      completed: false
    }

    this.router.navigateByUrl(`main/lists/items/${this.listId}`);
    console.log('Mandamos el listid --> ' + this.listId);

    // this.router.navigateByUrl(`/tabs/tab1/agregar/${listaId}`)

  }

  // Alert para crear lista
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
