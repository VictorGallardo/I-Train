import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PAGES_ROUTES } from './pages.routes';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ItemsComponent } from './items/items.component';
import { ListsComponent } from './lists/lists.component';
import { UsersComponent } from './users/users.component';
import { PagesComponent } from './pages.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';




@NgModule({
  declarations:
    [
      PagesComponent,
      DashboardComponent,
      UsersComponent,
      ListsComponent,
      ItemsComponent
    ],
  imports:
    [
      CommonModule,
      RouterModule,
      SharedModule,
      MatCardModule,
      MatTableModule,
      MatDividerModule,
      FlexLayoutModule,
      MatSidenavModule,
      MatPaginatorModule,
      MatIconModule,
      MatFormFieldModule,
      MatSortModule,
      MatInputModule,
      FormsModule,
      PAGES_ROUTES
    ],
  exports:
    [
      DashboardComponent,
      UsersComponent,
      ListsComponent,
      ItemsComponent
    ]
})

export class PagesModule { }
