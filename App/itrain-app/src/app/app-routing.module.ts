import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UserGuard } from './guards/user.guard';

const routes: Routes = [

  // Posts tabs
  {
    path: 'posts',
    loadChildren: () => import('./pages/posts/tabs/tabs.module').then((m) => m.TabsPageModule),
    canLoad: [UserGuard]
  },

  // Login
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },

  // Listas tabs
  {
    path: 'main',
    loadChildren: () => import('./pages/lists/lists-tabs/lists-tabs.module').then(m => m.ListsTabsPageModule),
    canLoad: [UserGuard]
  },
  {
    path: 'add-edit/:listId', // Aniadir items
    loadChildren: () => import('./pages/lists/add-edit/add-edit.module').then((m) => m.AddEditPageModule),

  },
  {
    path: 'add-edit', // Aniadir items
    loadChildren: () => import('./pages/lists/add-edit/add-edit.module').then((m) => m.AddEditPageModule),

  },

  // Si no hay ninguna ruta redirecciona a ésta.
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'main/lists/unfinish', // Main: POST
    // redirectTo: 'main/tabs/tab1', // Main: POST
  },
  // {
  //   path: 'items/:listId',
  //   loadChildren: () => import('./pages/lists/items/items.module').then(m => m.ItemsPageModule)
  // },
  // {
  //   path: 'add-item',
  //   loadChildren: () => import('./pages/lists/add-item/add-item.module').then( m => m.AddItemPageModule)
  // },
  // {
  //   path: 'add-edit',
  //   loadChildren: () => import('./pages/lists/add-edit/add-edit.module').then( m => m.AddEditPageModule)
  // },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
