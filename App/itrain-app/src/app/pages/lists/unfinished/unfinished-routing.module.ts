import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UnfinishedPage } from './unfinished.page';

const routes: Routes = [
  {
    path: '',
    component: UnfinishedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnfinishedPageRoutingModule {}
