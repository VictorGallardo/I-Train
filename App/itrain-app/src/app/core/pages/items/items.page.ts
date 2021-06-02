import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IItem } from 'src/app/shared/interfaces/interfaces';
import { ItemsService } from 'src/app/shared/services/items.service';
import { AlertController } from '@ionic/angular';
import { UiService } from '../../../shared/services/ui.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {

  items: IItem[] = [];
  listId: string;
  enabled: boolean = true;
  listTitle: string;
  itemCount: number;


  constructor
    (
      private itemsService: ItemsService,
      private actvRoute: ActivatedRoute,
      private alertCtrl: AlertController,
      private uiService: UiService,
      private router: Router
    ) { }


  ngOnInit() {

    this.listTitle = this.actvRoute.snapshot.paramMap.get('listTitle');
    this.listId = this.actvRoute.snapshot.paramMap.get('listId');


    this.itemsService.getItems(this.listId)
      .subscribe(resp => {
        console.log(resp);
        this.items.push(...resp.items);
        // this.listTitle = resp.items[0]?.list.title // Obtengo el titulo del primer item
      });

    this.itemsService.newItem.subscribe(item => {
      // Insertamos el item en el array de items en la 1º posición
      this.items.unshift(item);


    });


  }

  // Ir a añadir o editar

  goAddEdit() {
    this.router.navigateByUrl(`/add/${this.listId}`);
    console.log('Al añadir item tenemos listId --> ' + this.listId);
  }

  goToTimer(itemId) {
    this.router.navigateByUrl(`timer/${itemId}`);
  }

  goToAddEdit(listId, itemId) {
    this.router.navigateByUrl(`edit/${listId}/${itemId}`)
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
