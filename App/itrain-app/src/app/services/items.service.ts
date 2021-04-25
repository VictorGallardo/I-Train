import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { IItem, IRespItem } from '../interfaces/interfaces';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  listsPage = 0;
  newItem = new EventEmitter<IItem>();

  constructor(private http: HttpClient) { }

  // Obtener Items
  getItems(listId: string) {
    this.listsPage++;
    return this.http.get<IRespItem>(`${URL}/items/${listId}/?page=${this.listsPage}`)
  }

  // Crear Item
  // Parámetros: { El item: Toda la información cuando creamos un item
  //               listId: El id de la lista }
  createdItem(item, listId) {
    console.log(listId);
    this.http.post(`${URL}/items/${listId}`, item)
      .subscribe(resp => {
        this.newItem.emit(resp['item']);
      })

  }
}
