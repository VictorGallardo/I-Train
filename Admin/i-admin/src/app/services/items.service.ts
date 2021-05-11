import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IRespItem } from '../interfaces/interfaces';

const URL = environment.url;


@Injectable({
  providedIn: 'root'
})
export class ItemsService {


  constructor(private http: HttpClient) { }

  // Obtener todos los items

  getAllItems() {
    return this.http.get<IRespItem>(`${URL}/items/all`)
  }

}
