import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListsTabsPageRoutingModule } from './lists-tabs-routing.module';

import { ListsTabsPage } from './lists-tabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListsTabsPageRoutingModule
  ],
  declarations: [ListsTabsPage]
})
export class ListsTabsPageModule {}
