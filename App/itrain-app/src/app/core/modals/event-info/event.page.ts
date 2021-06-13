import { Component, Inject, Input, LOCALE_ID, OnInit } from '@angular/core';
import { IEvent } from '../../../shared/interfaces/interfaces';
import { ActionSheetController, ModalController, AlertController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { CalendarService } from '../../../shared/services/calendar.service';
import { UiService } from '../../../shared/services/ui.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {

  @Input() event: IEvent = {};
  eventModal: IEvent = {};
  startDate: string;
  endDate: string;

  constructor
    (
      @Inject(LOCALE_ID) private locale: string,
      private calendarService: CalendarService,
      private modalCtrl: ModalController,
      private alertCtrl: AlertController,
      private uiService: UiService,
      private router: Router

    ) { }


  ngOnInit(): void {
    console.log(this.router.url); //  /tu-ruta

    this.eventModal = this.event;
    console.log(this.eventModal);

    this.startDate = formatDate(this.event.startTime, 'dd-MM-yyy | HH:mm', this.locale);
    this.endDate = formatDate(this.event.endTime, 'dd-MM-yyy | HH:mm', this.locale)

    this.eventModal = {
      _id: this.event._id,
      title: this.event.title,
      description: this.event.description,

    }
  }


  close(opt?: string) {
    this.modalCtrl.dismiss({
      option: opt,
    });

  }

  editEvent(opt?: string) {

    this.modalCtrl.dismiss({
      option: opt,
      event: this.event

    });

  }


  // Alert para eliminar lista
  async deleteEventAlert(opt?: string) {

    const alert = await this.alertCtrl.create({
      header: 'Eliminar entrenamiento',
      message: '¿ Está seguro que desea eliminar éste entrenamiento ?',
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
            this.modalCtrl.dismiss({
              option: opt,
            });
            this.uiService.presentToast('Entrenamiento eliminado correctamente.');

          }
        }
      ]
    });
    await alert.present();
  }

}
