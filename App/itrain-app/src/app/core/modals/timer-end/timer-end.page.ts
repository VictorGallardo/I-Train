import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-timer-end',
  templateUrl: './timer-end.page.html',
  styleUrls: ['./timer-end.page.scss'],
})
export class TimerEndPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }


  closeModal() {
    this.modalCtrl.dismiss();
  }
}
