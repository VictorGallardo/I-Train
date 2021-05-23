import { Injectable } from '@angular/core';
import { Platform, NavController, AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BackButtonService {

  id: string;

  constructor
    (
      private navControler: NavController,
      private platform: Platform,
      private router: Router,
      private alertCtrl: AlertController,

  ) { }

  init() {
    this.platform.backButton.subscribeWithPriority(10, async () => {

      const currentUrl = this.router.url;

      if (currentUrl === "/main/lists/unfinish") {

        this.exitAlert("¿Desea salir de la app?", () => {
          navigator['app'].exitApp();
        });

      } else if (currentUrl === "/login") {
        this.exitAlert("¿Desea salir de la app?", () => {
          navigator['app'].exitApp();
        });

      } else {
        this.navControler.back();
      }
    });
  }

  async exitAlert(message: string, action: () => void) {
    const alert = await this.alertCtrl.create({
      message: message,
      buttons: [
        {
          text: "Cancelar",
          role: "cancel"
        },
        {
          text: "Salir",
          handler: action
        }
      ]
    });
    await alert.present();
  }

}
