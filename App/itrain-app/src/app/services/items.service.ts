import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IItem, IRespItem } from '../interfaces/interfaces';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  newItem = new EventEmitter<IItem>();
  itemsPage = 0;
  private item: IItem = {};

  constructor(private http: HttpClient) { }


  // Obtener Items
  getItems(listId: string) {
    return this.http.get<IRespItem>(`${URL}/items/${listId}`)
  }

  // Obtener item por id
  getItemById(itemId: string) {
    return this.http.get<IRespItem>(`${URL}/items/search/${itemId}`)

  }

  // Crear Item
  async createdItem(item, listId) {

    return new Promise(resolve => {

      console.log(listId);
      this.http.post(`${URL}/items/${listId}`, item) // Ruta al server, para crear items
        .subscribe(resp => {

          this.newItem.emit(resp['item']); // Emite el item para cargarlo el primero
          resolve(true); // Ya se hizo


        });

    });

  }

  // Actualizar Item
  async updateItem(listId: string, itemId: string, item: IItem) {

    return new Promise(resolve => {
      this.http.post(`${URL}/items/update/${listId}/${itemId}`, item)
        .subscribe(resp => {

          if (resp['ok']) {
            resolve(true);
            console.log('Item actualizado correctamente');
            console.log(resp)
          } else {
            resolve(false);
            console.error('Error al actualizar item');

          }
        });
    });

  }

  // Eliminar Item
  async deleteItem(itemId: string) {
    return new Promise(resolve => {
      this.http.delete(`${URL}/items/delete/${itemId}`)
        .subscribe(resp => {

          if (resp['ok']) {
            resolve(true);
            console.log('Item eliminado correctamente');
            console.log(resp)
          } else {
            resolve(false);
            console.error('Error al eliminar item');

          }
        });
    });
  }

  // Eliminar Items cuando se borra una lista

  async deleteItemsList(listId) {
    return new Promise(resolve => {
      this.http.delete(`${URL}/items/delete/items/${listId}`)
        .subscribe(resp => {

          if (resp['ok']) {
            resolve(true);
            console.log('Items eliminados correctamente');
            console.log(resp)
          } else {
            resolve(false);
            console.error('Error al eliminar items');

          }
        });
    });
  }


  // ---------------------------------------------------------------------------------------
}
