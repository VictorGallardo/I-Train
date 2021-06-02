import { Component, OnInit, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CalendarComponent } from 'ionic2-calendar';
import { CalendarMode } from 'ionic2-calendar/calendar';
import { Step } from 'ionic2-calendar/calendar';
import { CalendarService } from 'src/app/shared/services/calendar.service';
import { UiService } from 'src/app/shared/services/ui.service';
import { EventPage } from '../../modals/event-info/event.page';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  newEvent = {
    title: '',
    description: '',
    startTime: '',
    endTime: ''
  };

  respId: string;

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


  ) { }


  ngOnInit(): void {

    this.loadEvent();

    this.calService.newEvent.subscribe(ev => {
      this.allEvents.unshift(ev)

    });

  }

  // Carga los eventos creados en array allEvent

  loadEvent() {

    this.calService.getEvents().subscribe(resp => {

      this.allEvents = [];

      resp.events.forEach(event => {
        this.allEvents.push({
          _id: event._id,
          title: event.title,
          startTime: new Date(event.startTime),
          endTime: new Date(event.endTime),
          description: event.description,
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
    modal.onDidDismiss().then(() => {

      this.loadEvent();


    });
    return await modal.present();

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

    const created = await this.calService.createdEvent({
      title: this.newEvent.title,
      startTime: new Date(this.newEvent.startTime),
      endTime: new Date(this.newEvent.endTime),
      description: this.newEvent.description,
    });

    if (created) {
      this.loadEvent();
      this.showHideForm();

    }
  }

  onTimeSelected(ev: any) {
    const selected = new Date(ev.selectedTime);
    this.newEvent.startTime = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.newEvent.endTime = (selected.toISOString());
  }

}
