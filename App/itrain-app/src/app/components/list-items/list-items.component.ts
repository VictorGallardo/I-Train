import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { IItem } from '../../interfaces/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss'],
})
export class ListItemsComponent implements OnInit {

  @Input() items: IItem[] = []; // Aquí estoy recibiendo las listas que le paso del unfinished.page.html

  constructor(
    private alertCtrl: AlertController,
    private route: Router
  ) { }

  ngOnInit() {

    // console.log(this.items); // Para asegurarnos de que recibimos las listas

  }

  goToTimer(itemId) {
    this.route.navigateByUrl(`timer/${itemId}`);
  }
}
