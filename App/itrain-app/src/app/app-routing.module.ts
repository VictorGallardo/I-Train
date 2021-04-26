import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UserGuard } from './guards/user.guard';

const routes: Routes = [

  // Login
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  // Posts tabs
  {
    path: 'posts',
    loadChildren: () => import('./pages/posts/tabs/tabs.module').then((m) => m.TabsPageModule),
    canLoad: [UserGuard]
  },
  // Listas tabs
  {
    path: 'main',
    loadChildren: () => import('./pages/lists/tabs/lists-tabs.module').then(m => m.ListsTabsPageModule),
    canLoad: [UserGuard]
  },
  // Añadir items
  {
    path: 'add-edit/:listId',
    loadChildren: () => import('./pages/lists/add-edit/add-edit.module').then((m) => m.AddEditPageModule),

  },
  // Añadir items
  {
    path: 'add-edit',
    loadChildren: () => import('./pages/lists/add-edit/add-edit.module').then((m) => m.AddEditPageModule),

  },
  {
    path: 'timer/:itemId',
    loadChildren: () => import('./pages/timer/timer.module').then(m => m.TimerPageModule)
  },

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'main/lists/unfinish',

  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
