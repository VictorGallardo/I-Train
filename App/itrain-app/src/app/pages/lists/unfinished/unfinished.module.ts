import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UnfinishedPageRoutingModule } from './unfinished-routing.module';

import { UnfinishedPage } from './unfinished.page';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    UnfinishedPageRoutingModule
  ],
  declarations: [UnfinishedPage]
})
export class UnfinishedPageModule { }
