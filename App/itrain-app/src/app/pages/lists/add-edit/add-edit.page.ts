import { Component, OnInit } from '@angular/core';
import { IList } from 'src/app/interfaces/interfaces';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from '../../../services/items.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.page.html',
  styleUrls: ['./add-edit.page.scss'],
})
export class AddEditPage implements OnInit {


  list: IList;
  listId: string;

  item = {
    title: '',
    description: '',
    created: Date,
    completed: false,
    preparation: 0,
    sets: 0,
    time: 0,
    restSets: 0,
    repeats: 0,
    restReps: 0,
    totalTime: 0,
    list: '',

  }


  constructor
    (
      private itemsService: ItemsService,
      private actvdRoute: ActivatedRoute
    ) {


  }
  ngOnInit() {

    this.listId = this.actvdRoute.snapshot.paramMap.get('listId');
    // Para saber si es un nuevo ejercicio
    // if (id) {
    //   this.exercise = this.exercisesService.getExercise(+id)
    // }
  }

  // Crear Item
  // Este método esta en el itemsService y le paso el item Objeto creado arriba
  // y el listId que recibo
  createdItem() {
    console.log(this.item);
    this.itemsService.createdItem(this.item, this.listId);
  }


}
