import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { NopageComponent } from './shared/components/nopage/nopage.component';


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '**', component: NopageComponent }
];


export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true });
