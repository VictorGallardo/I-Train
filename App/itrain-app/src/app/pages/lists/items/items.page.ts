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
  enabled = true;

  constructor
    (
      private itemsService: ItemsService,
      private actvRoute: ActivatedRoute,
      private router: Router
    ) {


  }


  ngOnInit() {

    console.log('Entramos en items');

    this.nexts();

    this.listId = this.actvRoute.snapshot.paramMap.get('listId');

    this.itemsService.newItem.subscribe(item => {
      // Insertamos el item en el array de items en la 1º posición
      this.items.unshift(item);
      // this.listId = item.list; // Id de la lista
      // this.itemId = item._id // Aquí tengo el id del item
    });

    console.log(this.items);

  }

  // Refrescar items
  doRefresh(event) {

    this.nexts(event, true, this.listId);
    this.enabled = true;
    this.items = [];

  }

  // Infinite scroll
  nexts(event?, pull: boolean = false, listId?: string) {

    this.itemsService.getItems(pull, listId)
      .subscribe(resp => {
        console.log(resp);
        this.items.push(...resp.items);

        if (event) {
          event.target.complete();

          if (resp.items.length === 0)
            event.target.disabled = false;
        }

      });

  }


  // Ir a añadir o editar
  goAddEdit() {
    this.router.navigateByUrl(`/add-edit/${this.listId}`);
    console.log('Al añadir item tenemos listId --> ' + this.listId);
  }


  // Ir al timer
  goTimer(id: number) {
    this.router.navigateByUrl(`/timer${id != undefined ? '/' + id : ''}`);
  }




}
