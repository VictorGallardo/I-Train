import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarModalPage } from './calendar-modal.page';

const routes: Routes = [
  {
    path: '',
    component: CalendarModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarModalPageRoutingModule {}
