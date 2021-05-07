import { formatDate } from '@angular/common';
import { Component, Inject, Input, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { AlertController, ModalController } from '@ionic/angular';
import { CalendarComponent } from 'ionic2-calendar';
import { CalendarService } from '../../../services/calendar.service';
import { IEvent } from '../../../interfaces/interfaces';

const { Storage } = Plugins;


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  eventSource = [];
  counterId: number = 0;

  viewTitle: string;

  event: IEvent = {};

  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };

  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private calService: CalendarService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) {


  }

  ngOnInit() {

    // this.calService.getEvents()
    //   .subscribe(resp => {
    //     console.log(resp);
    //     this.eventSource.push(...resp.events);
    //   });

    // this.calService.newEvent.subscribe(event => {
    //   // Insertamos el item en el array de items en la 1º posición
    //   this.eventSource.unshift(event);

    // });
  }

  addNewEvent() {
    var date = new Date();
    let start = new Date(
      Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate()
      ));
    let end = new Date(
      Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate()
      ));
    this.event = {
      title: 'Event # ',
      startTime: start,
      endTime: end,
      allDay: false
    }

    console.log('Llega');

    this.calService.createdEvent(this.event)
  }




  // Título
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onTimeSelected = (ev: { selectedTime: Date, events: any[] }) => {
    console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' + (ev.events !== undefined && ev.events.length !== 0));
  };

  onCurrentChanged = (ev: Date) => {
    console.log('Currently viewed date: ' + ev);
  };

  onCurrentDateChanged(event: Date) {
    console.log('Current data changed: ' + event);

  }

  onRangeChanged(ev) {
    console.log('range changed: startTime: ' + ev.start + ' endTime: ' + ev.end);

  }
  // Día seleccionado
  async onEventSelected(event) {
    // Use Angular date pipe for conversion
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);

    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.desc,
      message: 'From: ' + start + '<br><br>To: ' + end,
      buttons: ['OK'],
    });
    alert.present();
  }

  // Eliminar eventos
  removeEvents() {
    this.eventSource = [];
  }


}
