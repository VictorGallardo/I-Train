import { Component, Inject, Input, LOCALE_ID, OnInit } from '@angular/core';
import { IEvent } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {

  @Input() event: IEvent = {};

  constructor
    (
      @Inject(LOCALE_ID) private locale: string,
      private modalCtrl: ModalController
    ) {

  }
  ngOnInit(): void {
    this.event = {
      title: this.event.title,
      description: this.event.description,
      startTime: formatDate(this.event.startTime, 'dd-MM-yyy | HH:mm', this.locale),
      endTime: formatDate(this.event.endTime, 'dd-MM-yyy | HH:mm', this.locale),
    }
  }

  close() {
    this.modalCtrl.dismiss();
  }


}
