import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Plugins } from '@capacitor/core';
import { environment } from '../../../environments/environment';
import { IUser } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';

const { Storage } = Plugins;
const URL = environment.url;


@Injectable({
  providedIn: 'root',
})

export class UserService {


  token: string = null;
  private user: IUser = {};


  constructor(private http: HttpClient, private navCtrl: NavController) { }


  // Login usuario

  login(email: string, password: string) { // Llamamos al login

    const data = { email, password };  // Mandamos el correo y el password
    return new Promise((resolve) => {

      this.http.post(`${URL}/user/login`, data)
        .subscribe(async resp => { // Ingresamos

          console.log(resp);

          if (resp['ok']) {
            await this.saveToken(resp['token']); // Async para que espera a guardar el token
            resolve(true);
          } else {
            this.token = null;
            Storage.clear();
            resolve(false);
          }
        });
    });
  }

  // Logout cerrar sesión usuario

  logout() {

    this.token = null; // Primero limpiamos el TOKEN.
    this.user = null;  // Limpiamos también el usuario.
    Storage.clear();   // Limpiamos el storage donde almacenamos el token.
    this.navCtrl.navigateRoot('/login', { animated: true }); // Volvemos al login.

  }


  // Registro de usuario

  register(user: any) {

    return new Promise((resolve) => {
      this.http.post(`${URL}/user/create`, user)
        .subscribe(async resp => {
          console.log(resp);

          if (resp['ok']) {
            // Antes de solucionar el registro con el async esperamos a guardar el token
            await this.saveToken(resp['token']);
            resolve(true);
          } else {
            this.token = null;
            Storage.clear();
            resolve(false);
          }
        });
    });
  }

  // Obtener información del usuario ----------------------------------------------

  getUser() {
    if (!this.user) {
      this.validateToken();
    }
    return { ...this.user }; // Se destruye la relación, para generar un nuevo objeto
  }


  // Guarda token en capacitor Storage

  async saveToken(token: string) {

    this.token = token; // Recibimos el token

    await Storage.set({ // Guardamos el token en el storage
      key: 'token',
      value: token
    });

    await this.validateToken(); // Esperamos a que valide el token

  }


  // Cargar el token

  async loadToken() {

    const token = await Storage.get({ key: 'token' });
    this.token = token.value;

    console.log(this.token);

  }


  // Validar el token ---------------------------------------------

  async validateToken(): Promise<boolean> {

    await this.loadToken();

    // Si el token no es valido se resuelve falso
    if (!this.token) {
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }

    return new Promise<boolean>(resolve => {

      // Token
      const headers = new HttpHeaders({
        'x-token': this.token
      })

      this.http.get(`${URL}/user/`, { headers }) // Ruta del usuario
        .subscribe(resp => {

          if (resp['ok']) {
            this.user = resp['user'];
            resolve(true);
          } else {
            this.navCtrl.navigateRoot('/login');
            resolve(false);
          }

        });

    });
  }

  // ---------------------------------------------------------------

  // Actualizar usuario --------------------------------------------

  async updateUser(user: IUser) {

    const headers = new HttpHeaders({
      'x-token': this.token
    });

    return new Promise(resolve => {

      this.http.post(`${URL}/user/update`, user, { headers })
        .subscribe(resp => {

          if (resp['ok']) {
            this.saveToken(resp['token']);
            resolve(true);
            console.log('Usuario actualizado correctamente');
            console.log(resp)
          } else {
            resolve(false);
            console.error('Error al actualizar usuario');

          }

        });
    });
  }



}
