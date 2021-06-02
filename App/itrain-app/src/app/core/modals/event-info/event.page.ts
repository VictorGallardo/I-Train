import { Component, Inject, Input, LOCALE_ID, OnInit } from '@angular/core';
import { IEvent } from '../../../shared/interfaces/interfaces';
import { ActionSheetController, ModalController, AlertController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { CalendarService } from '../../../shared/services/calendar.service';
import { UiService } from '../../../shared/services/ui.service';


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
      private calendarService: CalendarService,
      private modalCtrl: ModalController,
      private alertCtrl: AlertController,
      private uiService: UiService,

  ) {

  }
  ngOnInit(): void {

    this.event = {
      _id: this.event._id,
      title: this.event.title,
      description: this.event.description,
      startTime: formatDate(this.event.startTime, 'dd-MM-yyy | HH:mm', this.locale),
      endTime: formatDate(this.event.endTime, 'dd-MM-yyy | HH:mm', this.locale),
    }
    console.log(JSON.stringify(this.event) + " Evento");
  }

  close() {
    this.modalCtrl.dismiss();
  }

  editEvent(eventId: string, event: IEvent) {

    this.calendarService.editEvent(eventId, event);

  }


  // Alert para eliminar lista
  async deleteEventAlert() {

    const alert = await this.alertCtrl.create({
      header: 'Eliminar Evento',
      message: '¿ Está seguro que desea eliminar éste evento ?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
          }
        },
        {
          text: 'Borrar',
          handler: () => {

            this.calendarService.deleteEvent(this.event._id);
            this.modalCtrl.dismiss();
            this.uiService.presentToast('Evento eliminado correctamente.');


          }
        }
      ]
    });
    await alert.present();
  }

}
