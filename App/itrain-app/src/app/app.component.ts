import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component } from '@angular/core';
import { Plugins } from '@capacitor/core'
import { Platform } from '@ionic/angular';
import { BackButtonService } from './services/back-button.service';

// const { SplashScreen, StatusBar } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {


  constructor(
    private backButtonService: BackButtonService,
    private platform: Platform
  ) {

    this.initializeApp();
  }


  initializeApp() {

    this.platform.ready().then(() => {

      // SplashScreen.hide().catch(error => {
      //   console.log(error);
      // });

      // StatusBar.show().catch(error => {
      //   console.log(error);
      // });

      this.backButtonService.init();
    })



  }
}


