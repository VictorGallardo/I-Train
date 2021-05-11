import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IRespList } from '../interfaces/interfaces';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ListsService {


  constructor(private http: HttpClient) { }

  // Obtener todas las listas

  getAllLists() {
    return this.http.get<IRespList>(`${URL}/lists/all`)
  }

}
