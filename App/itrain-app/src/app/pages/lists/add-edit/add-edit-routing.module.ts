import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEditPage } from './add-edit.page';

const routes: Routes = [
  {
    path: '',
    component: AddEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddEditPageRoutingModule {}
