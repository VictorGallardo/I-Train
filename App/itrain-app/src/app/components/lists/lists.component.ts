import { Component, OnInit, Input } from '@angular/core';
import { IList } from '../../interfaces/interfaces';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {

  @Input() lists: IList[] = []; // Aquí estoy recibiendo las listas que le paso del unfinished.page.html

  constructor() { }

  ngOnInit() {

    console.log(this.lists); // Para asegurarnos de que recibimos las listas

  }

}
