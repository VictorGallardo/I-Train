import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListsTabsPage } from './lists-tabs.page';

const routes: Routes = [
  {
    path: 'lists',
    component: ListsTabsPage,
    children: [
      {
        path: 'unfinish', // Ejercicios sin terminar
        loadChildren: () => import('../../lists/unfinished/unfinished.module').then((m) => m.UnfinishedPageModule)
      },
      {
        path: 'finish', // Ejercicios terminados
        loadChildren: () => import('../../lists/finished/finished.module').then((m) => m.FinishedPageModule)
      },
      // {
      //   path: 'agregar/:listaId',
      //   loadChildren: () =>
      //     // import('../agregar/agregar.module').then(m => m.AgregarPageModule)
      // },
      {
        path: '',
        redirectTo: '/lists-tabs/unfinish',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/lists-tabs/unfinish',
    pathMatch: 'full'

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListsTabsPageRoutingModule { }
