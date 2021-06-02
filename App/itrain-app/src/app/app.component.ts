import { Component } from '@angular/core';
import { BackButtonService } from './shared/services/back-button.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {


  constructor(
    private backButtonService: BackButtonService,
  ) {

    this.initializeApp();
  }


  initializeApp() {

    this.backButtonService.init();


  }
}
