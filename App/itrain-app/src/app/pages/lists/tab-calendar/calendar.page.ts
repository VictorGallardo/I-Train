import { formatDate } from '@angular/common';
import { Component, Inject, Input, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { CalendarComponent } from 'ionic2-calendar';
import { CalendarService } from '../../../services/calendar.service';
import { IEvent } from '../../../interfaces/interfaces';
import { CalendarMode } from 'ionic2-calendar/calendar';
import { Step } from 'ionic2-calendar/calendar';
import { EventPage } from 'src/app/modals/event/event.page';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  newEvent = {
    title: '',
    description: '',
    imageURL: '',
    startTime: '',
    endTime: ''
  };

  allEvents = []

  currentMonth: string;
  showAddEvent: boolean;
  minDate = new Date().toISOString();

  calendar = {
    mode: 'month' as CalendarMode,
    currentDate: new Date(),
    step: 30 as Step
  };

  @ViewChild(CalendarComponent, { static: false }) myCalendar: CalendarComponent;

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private calService: CalendarService,
    private modalCtrl: ModalController,
  ) {
  }
  ngOnInit(): void {

    this.loadEvent();

    this.calService.newEvent.subscribe(ev => {
      this.allEvents.unshift(ev)

    });

  }

  /**
   *
   * Carga los eventos creados en array allEvent
   *
   */

  loadEvent() {

    this.calService.getEvents().subscribe(resp => {
      this.allEvents = [];

      resp.events.forEach(action => {
        this.allEvents.push({
          title: action.title,
          startTime: new Date(action.startTime),
          endTime: new Date(action.endTime),
          description: action.description,
        });
        this.myCalendar.loadEvents()
      })
    })

  }

  async onEventSelected(event: any) {

    const modal = await this.modalCtrl.create({
      component: EventPage,
      componentProps: {
        'event': event
      }
    });
    return await modal.present();

  }

  /**
   * Titulo del calendario (meses)
   * @param title
   */
  onViewTitleChanged(title: string) {
    this.currentMonth = title;
  }

  showHideForm() {
    this.showAddEvent = !this.showAddEvent;
    this.newEvent = {
      title: '',
      description: '',
      imageURL: '',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString()
    };
  }


  /**
   * Añadir eventos
   */
  addEvent() {
    this.calService.createdEvent({
      title: this.newEvent.title,
      startTime: new Date(this.newEvent.startTime),
      endTime: new Date(this.newEvent.endTime),
      description: this.newEvent.description,
      imageURL: this.newEvent.imageURL
    });
    this.loadEvent();
    this.showHideForm();
  }

  onTimeSelected(ev: any) {
    const selected = new Date(ev.selectedTime);
    this.newEvent.startTime = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.newEvent.endTime = (selected.toISOString());
  }





}
