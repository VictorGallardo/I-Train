import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TimerEndPageRoutingModule } from './timer-end-routing.module';

import { TimerEndPage } from './timer-end.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimerEndPageRoutingModule
  ],
  declarations: [TimerEndPage]
})
export class TimerEndPageModule {}
