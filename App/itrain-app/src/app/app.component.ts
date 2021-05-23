import { Component } from '@angular/core';
import { Plugins } from '@capacitor/core'
import { Platform } from '@ionic/angular';
import { BackButtonService } from './services/back-button.service';

const { SplashScreen, StatusBar, App } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(
    private backButtonService: BackButtonService
  ) {

    this.initializeApp();
  }

  initializeApp() {

    SplashScreen.hide().catch(error => {
      console.log(error);
    });

    StatusBar.show().catch(error => {
      console.log(error);
    });

    this.backButtonService.init();


  }
}


