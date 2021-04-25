import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { IItem } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {

  @Input() items: IItem[] = []; // Aquí estoy recibiendo las listas que le paso del unfinished.page.html

  constructor(private alertCtrl: AlertController) { }

  ngOnInit() {

    console.log(this.items); // Para asegurarnos de que recibimos las listas

  }
}
