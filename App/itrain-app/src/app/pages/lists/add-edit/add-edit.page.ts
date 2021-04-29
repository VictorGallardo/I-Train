import { Component, OnInit } from '@angular/core';
import { IList } from 'src/app/interfaces/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from '../../../services/items.service';
import { NgForm } from '@angular/forms';
import { UiService } from '../../../services/ui.service';


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
    created: null,
    completed: false,
    preparation: null,
    sets: null,
    time: null,
    restSets: null,
    repeats: null,
    restReps: null,
    totalTime: null,
    list: '',

  }


  constructor
    (
      private itemsService: ItemsService,
      private actvdRoute: ActivatedRoute,
      private uiService: UiService,
      private route: Router
    ) { }


  ngOnInit() {


    this.listId = this.actvdRoute.snapshot.paramMap.get('listId');
    console.log('En add-edit cogemos el listId --> ' + this.listId);

    // Para saber si es un nuevo ejercicio
    // if (id) {
    //   this.exercise = this.exercisesService.getExercise(+id)
    // }
  }

  // Crear Item

  async createdItem(formAddEdit: NgForm) {

    if (formAddEdit.invalid) { return; }
    console.log(this.item);

    this.item.totalTime = await this.item.preparation
      + this.item.restReps
      + this.item.restSets
      + this.item.time;

    const valid = await this.itemsService.createdItem(this.item, this.listId);

    if (valid) {

      // Purgamos el objeto para dejarlo vacio
      this.item = {
        title: '',
        description: '',
        created: null,
        completed: false,
        preparation: null,
        sets: null,
        time: null,
        restSets: null,
        repeats: null,
        restReps: null,
        totalTime: null,
        list: '',

      }
      // Volvemos a la lista de items
      this.route.navigateByUrl(`/main/lists/items/${this.listId}`);
      console.log('Mandamos el listId respuesta --> ' + this.listId);

    } else {
      this.uiService.alertInfo('Error al crear ejercicio');

    }


  }


}
