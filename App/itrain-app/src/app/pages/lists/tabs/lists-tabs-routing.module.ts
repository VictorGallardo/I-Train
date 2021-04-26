import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListsTabsPage } from './lists-tabs.page';

const routes: Routes = [
  {
    path: 'lists',
    component: ListsTabsPage,
    children: [

      // Listas sin terminar
      {
        path: 'unfinish',
        loadChildren: () => import('../tab-unfinish/unfinished.module').then((m) => m.UnfinishedPageModule)
      },
      // Listas terminadas
      {
        path: 'finish',
        loadChildren: () => import('../tab-finish/finished.module').then((m) => m.FinishedPageModule)
      },
      // Items
      {
        path: 'items/:listId/:listTitle',
        loadChildren: () => import('../tab-items/items.module').then((m) => m.ItemsPageModule)
      },
      // Items
      {
        path: 'items/:listId',
        loadChildren: () => import('../tab-items/items.module').then((m) => m.ItemsPageModule)
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
