import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { AlertController } from '@ionic/angular';
import { IList } from 'src/app/shared/interfaces/interfaces';
import { ListsService } from 'src/app/shared/services/lists.service';
import { UiService } from 'src/app/shared/services/ui.service';
import { ItemsService } from '../../../shared/services/items.service';

const { SplashScreen } = Plugins;

@Component({
  selector: 'app-lists',
  templateUrl: './lists.page.html',
  styleUrls: ['./lists.page.scss'],
})
export class ListsPage implements OnInit {

  lists: IList[] = [];
  enabled = true;

  list = {
    title: '',
    completed: false,
  }

  listId: string;
  listTitle: string;
  listLength: number;


  constructor(
    private listsService: ListsService,
    private itemsService: ItemsService,
    private alertCtrl: AlertController,
    private uiService: UiService,
    private route: Router
  ) { }

  ngOnInit() {

    this.nextsItems();
    this.listsService.newList.subscribe(list => {
      this.lists.unshift(list)
      this.listId = list._id;
      this.listTitle = list.title;
    });

  }


  ionViewDidEnter() {

    SplashScreen.hide().catch(error => {
      console.log(error);
    });
  }

  // Cargar las páginas
  loadLists(event) {

    this.nextsItems(event, true);
    this.enabled = true;
    this.lists = []

  }

  // Infinite Scroll
  async nextsItems(event?, pull: boolean = false) {


    this.listsService.getLists(pull) // getList de listService // Esto me devuelve las listas del usuario logeado
      .subscribe(resp => {
        console.log(resp);

        this.lists.push(...resp.lists);

        if (event) {
          event.target.complete();

          if (resp.lists.length === 0)
            event.target.disabled = false;

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

    this.route.navigateByUrl(`main/tabs/items/${this.listId}/${this.listTitle}`);
    console.log('Mandamos el listid --> ' + this.listId);

    // this.router.navigateByUrl(`/tabs/tab1/agregar/${listaId}`)

  }

  // Alert para crear lista
  async addList() {

    const alert = await this.alertCtrl.create({
      cssClass: 'alert-list',
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


  goToItems(listId, listTitle) {
    this.route.navigateByUrl(`main/tabs/items/${listId}/${listTitle}`);
  }


  // Eliminar lista

  deleteList(listId: string, index: number) {
    this.listsService.deleteList(listId);
    this.itemsService.deleteItemsList(listId);
    this.lists.splice(index, 1);
  }

  // Alert para eliminar lista
  async deleteListAlert(listId: string, index: number) {

    const alert = await this.alertCtrl.create({
      header: 'Eliminar Lista',
      message: '¿ Está seguro que desea eliminar esta lista ?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
          }
        },
        {
          text: 'Borrar',
          handler: () => {

            this.deleteList(listId, index)
            this.uiService.presentToast('Lista eliminada correctamente.');

          }
        }
      ]
    });
    await alert.present();
  }


  async editListAlert(listId: string, list: string) {


    const alert = await this.alertCtrl.create({
      header: 'Editar lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: list,
          placeholder: 'Nombre de la lista '
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
            // this.list.closeSlidingItems();
          }
        },
        {
          text: 'Guardar',
          handler: async (data) => {

            console.log(data);


            this.list.title = data.titulo

            const update = await this.listsService.updateList(listId, this.list);

            if (update) {
              this.loadLists(list)
              this.uiService.presentToast('Item actualizado correctamente')// Toast con mensaje de actualizado

            } else {

              this.uiService.presentToast('Error al actualizar item')
            }


          }


        }
      ]
    });

    await alert.present();

  }

}
