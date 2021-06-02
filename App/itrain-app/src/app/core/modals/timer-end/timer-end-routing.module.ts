import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimerEndPage } from './timer-end.page';

const routes: Routes = [
  {
    path: '',
    component: TimerEndPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TimerEndPageRoutingModule {}
