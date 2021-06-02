import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IRespPost, IPost } from '../interfaces/interfaces';
import { UserService } from './user.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { UiService } from './ui.service';

// Manejo de errores
import { catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(

    private http: HttpClient,
    private userService: UserService,
    private loadingCtrl: LoadingController,
    private uiService: UiService

  ) { }

  pagePosts = 0;
  newPost = new EventEmitter<IPost>();
  loading: any;


  // Obtener post

  getPosts(pull: boolean = true) {

    if (pull) {
      this.pagePosts = 0;
    }

    this.pagePosts++;
    return this.http.get<IRespPost>(`${URL}/posts/?page=${this.pagePosts}`);
  }


  // Crear un post

  crearPost(post) {

    const headers = new HttpHeaders({
      'x-token': this.userService.token // Traemos el token del userService
    });

    return new Promise(resolve => {

      this.http.post(`${URL}/posts`, post, { headers })
        .subscribe(resp => {

          console.log(resp);
          // Esto emite el nuevo post mediante el eventEmiter ----------------
          this.newPost.emit(resp['post']);
          // En tab1.ts creo una subscripción que estara pendiente cada vez que se reciba un mensaje
          // -----------------------------------------------------------------
          resolve(true); // Resuelvo con true cuando ya se hizo la emisión

        });
    });


  }

  // Subir imagen

  async uploadImageHttp(webPath: string) {
    // anunciar inicio de upload al usuario
    this.loading = await this.loadingCtrl.create({
      message: 'Enviando al servidor...'
    });
    await this.loading.present();
    const blob = await fetch(webPath).then(r => r.blob());
    return new Promise<boolean>(resolve => {
      // headers
      const headers = new HttpHeaders({
        'x-token': this.userService.token
      });
      const formData = new FormData();
      formData.append('image', blob, `image.jpg`);
      this.http.post<boolean>(`${URL}/posts/upload`, formData, { headers })
        .pipe(
          catchError(e => this.handleError(e)),
          finalize(() => this.loading.dismiss())
        )
        .subscribe((resp: any) => {
          if (resp.ok) {
            this.uiService.presentToast('¡Imagen subida con exito!');
            resolve(true);
          } else {
            this.uiService.presentToast('¡Error al subir la imagen!');
            resolve(false);
          }
        });
    });
  }

  // Control de errores
  private handleError(error: any) {
    const errorMsg = error.message ? error.message : error.toString();
    return throwError(errorMsg);
  }

}
