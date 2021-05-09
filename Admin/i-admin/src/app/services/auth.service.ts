import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { IUser } from '../interfaces/interfaces';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: IUser = {};
  token: any = null;

  constructor
    (
      private http: HttpClient,
      private cookies: CookieService,
      private router: Router
    ) { }

  // Login

  login(email: string, password: string, check: boolean) { // Llamamos al login

    // Si marcamos el checkbox de recordar guardamo el email local storage
    if (check) {
      localStorage.setItem('email', email);
    } else {
      localStorage.removeItem('email');
    }

    const data = { email, password };  // Mandamos el correo y el password
    return new Promise<any>((resolve) => {

      this.http.post<any>(`${URL}/user/login`, data)
        .subscribe(async resp => { // Ingresamos

          console.log(resp);

          if (resp['ok']) {
            await this.saveToken(resp['token']); // Async para que espera a guardar el token
            resolve(true);
          } else {
            this.token = null;

            resolve(false);
          }
        });
    });

  }

  // Logout cerrar sesión usuario

  logout() {

    this.token = null; // Primero limpiamos el TOKEN.
    this.user;  // Limpiamos también el usuario.
    this.cookies.deleteAll();   // Limpiamos las cookies donde almacenamos el token.
    this.router.navigateByUrl('/login'); // Volvemos al login.

  }


  // Obtener información del usuario ----------------------------------------------

  // getUser() {
  //   if (!this.user) {
  //     this.validateToken();
  //   }
  //   return { ...this.user }; // Se destruye la relación, para generar un nuevo objeto
  // }


  // Guardar el token en las cookies

  async saveToken(token: string) {
    this.cookies.set("token", token);
    await this.validateToken(); // Esperamos a que valide el token

  }

  // Cargar el token

  loadToken() {

    if (this.cookies.get('token')) {
      this.token = this.cookies.get('token');
    } else {
      this.token = '';
    }
  }

  // Validar el token

  async validateToken(): Promise<boolean> {

    this.loadToken()

    // Si el token no es valido se resuelve falso
    if (!this.token) {
      this.router.navigateByUrl('/login');
      return Promise.resolve(false);
    }

    return new Promise<boolean>(resolve => {

      // Token
      const headers = new HttpHeaders({
        'x-token': this.token
      })

      this.http.get<any>(`${URL}/user/`, { headers }) // Ruta del usuario
        .subscribe(resp => {

          if (resp['ok']) {
            this.user = resp['user'];
            resolve(true);
          } else {
            this.router.navigateByUrl('/login');
            resolve(false);
          }

        });

    });

  }


}
