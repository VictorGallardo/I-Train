import { EventEmitter, Injectable, Input } from '@angular/core';
import { IEvent, IRespEvent } from '../interfaces/interfaces';

// Importamos el plugin capacitor
import { Plugins } from '@capacitor/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserService } from './user.service';

const URL = environment.url;


@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  newEvent = new EventEmitter<IEvent>();


  constructor
    (
      private http: HttpClient,
      private userService: UserService
    ) { }


  // Obtener eventos
  getEvents() {

    const headers = new HttpHeaders({
      'x-token': this.userService.token // Traemos el token del userService
    });

    return this.http.get<IRespEvent>(`${URL}/events/`, { headers }); // Hay que pasarle el header aqui IMPORTANTE!!
  }


  // Crear eventos
  createdEvent(event) {

    const headers = new HttpHeaders({
      'x-token': this.userService.token
    });

    return new Promise(resolve => {

      this.http.post(`${URL}/events`, event, { headers })
        .subscribe(resp => {
          this.newEvent.emit(resp['event']);
          resolve(true);
        });

    });

  }
}