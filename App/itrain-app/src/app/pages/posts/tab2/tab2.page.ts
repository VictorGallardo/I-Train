import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { PostsService } from '../../../services/posts.service';
import { UiService } from '../../../services/ui.service';
import { Plugins, CameraResultType, CameraSource, CameraOptions } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

const { Camera } = Plugins;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  tempImages: SafeResourceUrl[] = [];
  // SafeResourceUrl resuelve que se almacenen las url seguras y "sanitizadas"

  post = {
    message: '',
    coords: null,
    position: false
  }

  constructor(
    private postsService: PostsService,
    private route: Router,
    private uiService: UiService,
    private sanitizer: DomSanitizer
  ) { }


  // Crear post

  async crearPost() {

    const created = await this.postsService.crearPost(this.post); // Este crear post es del postsService
    console.log(this.post);

    if (created) {

      this.post = {  // Purga el post
        message: '',
        coords: null,
        position: false
      };

      this.tempImages = [];

      this.route.navigateByUrl('posts/tabs/tab1'); // Navega a tab1 y veremos el nuevo post

    } else {

      this.uiService.presentToast('Error al compartir')

      this.post = {  // Purga el post
        message: '',
        coords: null,
        position: false
      };

    }

  }

  // Cámara
  async takePhoto() {
    this.imgProcess(CameraSource.Camera);
  }


  // Galería 
  addPhoto() {
    this.imgProcess(CameraSource.Photos);
  }


  // Procesado de imágenes
  async imgProcess(source: CameraSource) { // Se le pasa el parametro camera source

    const cameraOpts = { // Opciones de la cámara
      quality: 60,
      allowEditing: false,
      correctOrientation: true,
      source,
      resultType: CameraResultType.Uri,
    };

    try {
      const image = await Camera.getPhoto(cameraOpts);
      // sanitizar la url de la imagen
      const img = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.webPath));
      // empujar la imagena nuestro array temporal
      this.tempImages.push(img);
      // llamar a servicio que sube la imagen al servidor
      this.postsService.uploadImageHttp(image.webPath);
    } catch (err) { // capturar error e indicarlo
      console.error(err);
    }

  }

}