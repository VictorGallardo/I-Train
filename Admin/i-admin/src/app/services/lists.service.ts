import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { IRespList } from '../interfaces/interfaces';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ListsService {



  constructor(
    private http: HttpClient,
    private authService: AuthService) { }



  // Obtener listas
  getLists() {


    const headers = new HttpHeaders({
      'x-token': this.authService.token // Traemos el token del userService
    });

    return this.http.get<IRespList>(`${URL}/lists/`, { headers }); // Hay que pasarle el header aqui IMPORTANTE!!
  }
}
