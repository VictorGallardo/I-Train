import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimerStartPage } from './timer-start.page';

const routes: Routes = [
  {
    path: '',
    component: TimerStartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TimerStartPageRoutingModule {}
