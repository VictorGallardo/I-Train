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
  enabled: boolean = true;
  listTitle: string;

  constructor
    (
      private itemsService: ItemsService,
      private actvRoute: ActivatedRoute,
      private router: Router
    ) { }


  ngOnInit() {

    this.listTitle = this.actvRoute.snapshot.paramMap.get('listTitle');
    this.listId = this.actvRoute.snapshot.paramMap.get('listId');


    this.itemsService.getItems(this.listId)
      .subscribe(resp => {
        console.log(resp);
        this.items.push(...resp.items);
        this.listTitle = resp.items[0].list.title // Obtengo el titulo del primer item
      });

    this.itemsService.newItem.subscribe(item => {
      // Insertamos el item en el array de items en la 1º posición
      this.items.unshift(item);


    });

  }

  // Ir a añadir o editar

  goAddEdit() {
    this.router.navigateByUrl(`/add-edit/${this.listId}`);
    console.log('Al añadir item tenemos listId --> ' + this.listId);
  }





}
