import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TimerStartPageRoutingModule } from './timer-start-routing.module';

import { TimerStartPage } from './timer-start.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimerStartPageRoutingModule
  ],
  declarations: [TimerStartPage]
})
export class TimerStartPageModule {}
