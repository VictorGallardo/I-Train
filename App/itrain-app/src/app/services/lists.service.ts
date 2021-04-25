import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { UserService } from './user.service';
import { IRespList, IList } from '../interfaces/interfaces';


const URL = environment.url;


@Injectable({
  providedIn: 'root'
})
export class ListsService {

  pageLists = 0;
  newList = new EventEmitter<IList>();


  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  // Obtener listas 
  getLists(pull: boolean = false) {

    if (pull) {
      this.pageLists = 0;
    }

    const headers = new HttpHeaders({
      'x-token': this.userService.token // Traemos el token del userService
    });
    this.pageLists++;
    return this.http.get<IRespList>(`${URL}/lists/?page=${this.pageLists}`, { headers }) // Hay que pasarle el header aqui IMPORTANTE!!
  }

  // Crear listas
  createdList(list) {

    const headers = new HttpHeaders({
      'x-token': this.userService.token
    });

    return new Promise(resolve => {

      this.http.post(`${URL}/lists`, list, { headers })
        .subscribe(resp => {
          this.newList.emit(resp['list']);
          resolve(true);
        });

    });



  }


  // Añadir listas


}
