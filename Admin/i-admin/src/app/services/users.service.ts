import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IRespUser } from '../interfaces/interfaces';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  // Obtener todos los Usuarios

  getAllUsers() {
    return this.http.get<IRespUser>(`${URL}/user/all`)
  }


}


