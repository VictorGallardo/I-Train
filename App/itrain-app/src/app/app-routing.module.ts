import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UserGuard } from './shared/guards/user.guard';

const routes: Routes = [

  // Login
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then((m) => m.LoginPageModule),
  },

  // Core
  {
    path: 'main',
    loadChildren: () => import('./core/pages/tabs/tabs.module').then(m => m.TabsPageModule),
    canLoad: [UserGuard]
  },

  // Añadir items
  {
    path: 'add/:listId',
    loadChildren: () => import('./core/pages/add-edit/add-edit.module').then((m) => m.AddEditPageModule),

  },

  // Añadir items
  {
    path: 'edit/:listId/:itemId',
    loadChildren: () => import('./core/pages/add-edit/add-edit.module').then((m) => m.AddEditPageModule),

  },

  // Timer
  {
    path: 'timer/:itemId',
    loadChildren: () => import('./core/pages/timer/timer.module').then(m => m.TimerPageModule)
  },

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'main/tabs/lists',

  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
