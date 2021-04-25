import { Component, OnInit, Input } from '@angular/core';
import { IList } from '../../interfaces/interfaces';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {

  @Input() lists: IList[] = []; // Aquí estoy recibiendo las listas que le paso del unfinished.page.html

  constructor(private alertCtrl: AlertController) { }

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


  // borrarLista(lista: Lista) {
  //   this.deseosService.borrarLista(lista);
  // }


  async editList(list: IList) {

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
            if (data.titulo.length === 0) {
              return;
            }
            // Aqui va la lógica de actualizar lista

          }
        }
      ]
    });

    await alert.present();

  }
}