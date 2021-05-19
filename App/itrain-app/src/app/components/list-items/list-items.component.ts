import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { IItem } from '../../interfaces/interfaces';
import { Router } from '@angular/router';
import { ItemsService } from '../../services/items.service';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss'],
})
export class ListItemsComponent implements OnInit {

  @Input() items: IItem[] = []; // Aquí estoy recibiendo las listas que le paso del unfinished.page.html

  constructor(
    private itemsService: ItemsService,
    private alertCtrl: AlertController,
    private uiService: UiService,
    private route: Router,
  ) { }

  ngOnInit() {

    // console.log(this.items); // Para asegurarnos de que recibimos las listas


  }

  goToTimer(itemId) {
    this.route.navigateByUrl(`timer/${itemId}`);
  }

  goToAddEdit(listId, itemId) {
    this.route.navigateByUrl(`edit/${listId}/${itemId}`)
  }


  // Eliminar item

  deleteItem(itemId: string, index: number) {
    this.itemsService.deleteItem(itemId);
    this.items.splice(index, 1);
  }

  // Alert para eliminar item

  async deleteItemAlert(itemId: string, index: number) {

    const alert = await this.alertCtrl.create({
      header: 'Eliminar Item',
      message: '¿ Está seguro que desea eliminar este item ?',
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

            this.deleteItem(itemId, index)
            this.uiService.presentToast('Item eliminado correctamente.');

          }
        }
      ]
    });
    await alert.present();
  }
}
