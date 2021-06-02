import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarPageRoutingModule } from './calendar-routing.module';

import { CalendarPage } from './calendar.page';
import { NgCalendarModule } from 'ionic2-calendar';

import { registerLocaleData } from '@angular/common'
import localeEs from '@angular/common/locales/es-419';

registerLocaleData(localeEs);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarPageRoutingModule,
    NgCalendarModule,

  ],
  declarations: [CalendarPage],
  providers: [{ provide: LOCALE_ID, useValue: 'es-419' }],
})
export class CalendarPageModule { }
