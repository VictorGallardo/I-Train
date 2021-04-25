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
        loadChildren: () => import('../unfinished/unfinished.module').then((m) => m.UnfinishedPageModule)
      },
      {
        path: 'finish', // Ejercicios terminados
        loadChildren: () => import('../finished/finished.module').then((m) => m.FinishedPageModule)
      },
      {
        path: 'items/:listId',
        loadChildren: () => import('../items/items.module').then((m) => m.ItemsPageModule)
      },
      {
        path: '',
        redirectTo: '/lists/unfinish',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/lists/unfinish',
    pathMatch: 'full'

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListsTabsPageRoutingModule { }
