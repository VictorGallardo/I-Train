import { Component, OnInit, Input } from '@angular/core';
import { IList, IItem } from '../../interfaces/interfaces';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ListsService } from '../../services/lists.service';
import { ItemsService } from '../../services/items.service';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {

  @Input() lists: IList[] = []; // Aquí estoy recibiendo las listas que le paso del unfinished.page.html
  list: IList = {};

  constructor
    (
      private alertCtrl: AlertController,
      private listsService: ListsService,
      private itemsService: ItemsService,
      private uiService: UiService,
      private route: Router
    ) { }

  ngOnInit() {

    console.log(this.lists); // Para asegurarnos de que recibimos las listas

  }

  // listaSeleccionada(lista: Lista) {

  //   if (this.terminada) {
  //     this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
  //   } else {
  //     this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
  //   }

  // }


  goToItems(listId, listTitle) {
    this.route.navigateByUrl(`main/lists/items/${listId}/${listTitle}`);
  }


  // Eliminar lista

  deleteList(listId: string, index: number) {
    this.listsService.deleteList(listId);
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

  async editList(listId, list) {

    const alert = await this.alertCtrl.create({
      header: 'Editar lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: list.title,
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
          handler: (data) => {
            if (data.titulo.length === 0) { return; }

            this.listsService.updateList(listId, list)

          }
        }
      ]
    });

    await alert.present();

  }
}
