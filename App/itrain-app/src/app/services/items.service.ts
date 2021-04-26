import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IItem, IRespItem } from '../interfaces/interfaces';
import { Router } from '@angular/router';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  newItem = new EventEmitter<IItem>();

  constructor(private http: HttpClient) { }

  // Obtener Items
  getItems(listId: string) {
    return this.http.get<IRespItem>(`${URL}/items/${listId}`)
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
