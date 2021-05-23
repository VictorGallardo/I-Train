import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEditListsPageRoutingModule } from './add-edit-lists-routing.module';

import { AddEditListsPage } from './add-edit-lists.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddEditListsPageRoutingModule
  ],
  declarations: [AddEditListsPage]
})
export class AddEditListsPageModule {}
