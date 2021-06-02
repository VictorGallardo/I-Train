import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(

    private alertCtrl: AlertController,
    private toastCtrl: ToastController

  ) { }


  // Alertas de información ------------------------------------------

  async alertInfo(message: string) {
    const alert = await this.alertCtrl.create({

      message,
      buttons: ['OK']
    });

    await alert.present();
  }


  // Alertas al cerrar ------------------------------------------------

  async alertClose(message: string, action: () => void) {
    const alert = await this.alertCtrl.create({

      message,
      buttons:
        [
          {
            text: 'Cancelar',
            role: 'cancel',

          },
          {
            text: 'Ok',
            handler: action
          }
        ]
    });

    await alert.present();
  }


  // Toast ------------------------------------------------------------

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }

  // ------------------------------------------------------------------


}
