import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinishedPageRoutingModule } from './finished-routing.module';

import { FinishedPage } from './finished.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinishedPageRoutingModule
  ],
  declarations: [FinishedPage]
})
export class FinishedPageModule {}
