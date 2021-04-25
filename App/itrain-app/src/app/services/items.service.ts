import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { IItem, IRespItem } from '../interfaces/interfaces';
import { Router } from '@angular/router';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  pageItems = 0;
  newItem = new EventEmitter<IItem>();

  constructor(private http: HttpClient) { }

  // Obtener Items
  getItems(pull: boolean = false, listId: string) {

    if (pull) {
      this.pageItems = 0;
    }

    this.pageItems++;
    return this.http.get<IRespItem>(`${URL}/items/${listId}/?page=${this.pageItems}`)
  }

  // Crear Item
  // Parámetros: { El item: Toda la información cuando creamos un item
  //               listId: El id de la lista }
  createdItem(item, listId) {

    return new Promise(resolve => {

      console.log(listId);
      this.http.post(`${URL}/items/${listId}`, item) // Ruta al server, para crear items
        .subscribe(resp => {

          this.newItem.emit(resp['item']); // Emite el item para cargarlo el primero
          resolve(true); // Ya se hizo 


        });

    });

  }



  // ---------------------------------------------------------------------------------------
}
