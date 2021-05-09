import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_ROUTES } from './app.routes';


// Modulos
import { PagesModule } from './pages/pages.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './login/login.module';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { LoginGuard } from './guards/login.guard';


@NgModule({
  declarations:
    [
      AppComponent,
    ],

  imports:
    [
      BrowserModule,
      BrowserAnimationsModule,
      APP_ROUTES,
      PagesModule,
      LoginModule,
      HttpClientModule,
    ],

  providers: [CookieService, LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
