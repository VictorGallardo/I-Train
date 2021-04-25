import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IItem } from '../../../interfaces/interfaces';
import { ItemsService } from '../../../services/items.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {

  items: IItem[] = [];
  listId: string;

  constructor
    (
      private itemsService: ItemsService,
      private actvRoute: ActivatedRoute,
      private router: Router
    ) {

    // Aquí tenemos el id de la lista
    this.listId = this.actvRoute.snapshot.paramMap.get('listId');
    // this.lista = this.deseosService.obtenerLista(listaId);
    console.log(this.listId + '****');

    // Ahora aquí tenemos que llamar al método del getHttp para trer los items con el id de la lista

    // Cargamos los Items
    this.itemsService.getItems(this.listId) // getItems de itemsService // Esto me devuelve los items de esa lista
      .subscribe(resp => {
        console.log(resp);
        this.items.push(...resp.items); // Cargamos el array del items

      });

    // Esta es la subscripción para el EventEmitter del itemService
    this.itemsService.newItem.subscribe(item => {
      // Insertamos el item en el array de items en la 1º posición
      this.items.unshift(item);
    });
  }

  ngOnInit() {
  }

  // Ir a añadir o editar
  goAddEdit() {
    this.router.navigateByUrl(`/add-edit/${this.listId}`);
    console.log(' Vaaaaaa !');
    console.log(this.listId);


  }

  // Ir al timer
  goTimer(id: number) {
    this.router.navigateByUrl(`/timer${id != undefined ? '/' + id : ''}`);
  }




}
