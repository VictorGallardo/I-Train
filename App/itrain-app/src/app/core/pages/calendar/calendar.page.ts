import { Component, OnInit, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CalendarComponent } from 'ionic2-calendar';
import { CalendarMode } from 'ionic2-calendar/calendar';
import { Step } from 'ionic2-calendar/calendar';
import { CalendarService } from 'src/app/shared/services/calendar.service';
import { UiService } from 'src/app/shared/services/ui.service';
import { EventPage } from '../../modals/event-info/event.page';
import { IEvent } from '../../../shared/interfaces/interfaces';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  newEvent: IEvent = {
    _id: '',
    title: '',
    description: '',
    startTime: '',
    endTime: ''
  };

  respId: string;
  update: boolean = false;
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
    private uiService: UiService


  ) { }


  ngOnInit(): void {

    this.loadEvent();

    this.calService.newEvent.subscribe(ev => {
      this.allEvents.unshift(ev)

    });

  }

  loadEventEdit(event: IEvent) {

    console.log(event);

    if (this.update) {

      this.newEvent._id = event._id;
      this.newEvent.title = event.title;
      this.newEvent.description = event.description;
      this.newEvent.startTime = new Date(event.startTime).toISOString();
      this.newEvent.endTime = new Date(event.endTime).toISOString();

    }
  }

  // Carga los eventos creados en array allEvent

  loadEvent() {

    this.calService.getEvents().subscribe(resp => {

      this.allEvents = [];

      resp.events.forEach(event => {
        this.allEvents.push({
          _id: event._id,
          title: event.title,
          description: event.description,
          startTime: new Date(event.startTime),
          endTime: new Date(event.endTime),
        });
        this.myCalendar.loadEvents();
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
    await modal.present();

    const { data } = await modal.onDidDismiss()

    if (data) {

      if (data.option === 'close') this.loadEvent();
      if (data.option === 'update') {

        this.update = true;
        console.log('Actualizamos');
        console.log(data.event);

        this.loadEventEdit(data.event)
        this.showAddEvent = !this.showAddEvent;


      } else {
        console.log('cargamos eventos');
        this.update = false;
        this.loadEvent();

      }
    }
  }


  onViewTitleChanged(title: string) {
    this.currentMonth = title;
  }

  showHideForm() {
    this.showAddEvent = !this.showAddEvent;
    this.newEvent = {
      title: '',
      description: '',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString()
    };
  }

  async addEvent() {

    console.log(this.update);


    if (this.update) {

      const edit = await this.calService.editEvent(this.newEvent._id, this.newEvent);

      if (edit) {
        this.uiService.presentToast('Entrenamiento editado correctamente')
        this.showHideForm();
        this.loadEvent();
        this.update = false;
      }
    } else {

      const created = await this.calService.createdEvent(this.newEvent);

      if (created) {
        this.uiService.presentToast('Entrenamiento creado correctamente')
        this.showHideForm();
        this.loadEvent();
      }

    }

  }

  async editEvent() {

  }

  onTimeSelected(ev: any) {
    const selected = new Date(ev.selectedTime);
    this.newEvent.startTime = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.newEvent.endTime = (selected.toISOString());
  }

}
