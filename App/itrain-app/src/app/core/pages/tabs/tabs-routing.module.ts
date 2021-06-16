import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [

      // Listas
      {
        path: 'lists',
        loadChildren: () => import('../lists/lists.module').then((m) => m.ListsPageModule)
      },

      // Calendar
      {
        path: 'calendar',
        loadChildren: () => import('../calendar/calendar.module').then((m) => m.CalendarPageModule)
      },

      // Perfil
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then((m) => m.ProfilePageModule)
      },

      // Items
      {
        path: 'items/:listId/:listTitle',
        loadChildren: () => import('../items/items.module').then((m) => m.ItemsPageModule)
      },

      // Items
      {
        path: 'items/:listId',
        loadChildren: () => import('../items/items.module').then((m) => m.ItemsPageModule)
      },

      {
        path: '',
        redirectTo: '/tabs/lists',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/lists',
    pathMatch: 'full'

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }
