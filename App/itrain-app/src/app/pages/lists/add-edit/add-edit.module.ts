import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEditPageRoutingModule } from './add-edit-routing.module';

import { AddEditPage } from './add-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddEditPageRoutingModule
  ],
  declarations: [AddEditPage]
})
export class AddEditPageModule { }
