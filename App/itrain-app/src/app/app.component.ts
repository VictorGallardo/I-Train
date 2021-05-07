import { Component } from '@angular/core';
import { Plugins } from '@capacitor/core'
import { UserService } from './services/user.service';
import { MenuController } from '@ionic/angular';

const { SplashScreen, StatusBar } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor() {

    this.initializeApp();
  }


  initializeApp() {

    SplashScreen.hide().catch(error => {
      console.log(error);
    });

    StatusBar.hide().catch(error => {
      console.log(error);
    });
  }

}


