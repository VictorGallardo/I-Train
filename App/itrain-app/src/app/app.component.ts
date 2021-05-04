import { Component } from '@angular/core';
import { Plugins } from '@capacitor/core'
import { UserService } from './services/user.service';
import { IUser } from './interfaces/interfaces';

const { SplashScreen, StatusBar } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(private userService: UserService) {
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


