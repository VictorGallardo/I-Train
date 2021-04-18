import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';
import { IRespPost, IPost } from '../interfaces/interfaces';
import { UserService } from './user.service';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(

    private http: HttpClient,
    private userService: UserService

  ) { }

  pagePosts = 0;
  newPost = new EventEmitter<IPost>();

  getPosts(pull: boolean = false) {


    if (pull) {
      this.pagePosts = 0;
    }

    this.pagePosts++;
    return this.http.get<IRespPost>(`${URL}/posts/?page=${this.pagePosts}`);
  }

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

}
