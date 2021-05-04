import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';
import { IonicModule, MenuController } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { AvatarSelectComponent } from './avatar-select/avatar-select.component';
import { ListsComponent } from './lists/lists.component';
import { ListItemsComponent } from './list-items/list-items.component';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';


@NgModule({
  // Declaro mis componentes
  declarations: [
    AvatarSelectComponent,
    ListItemsComponent,
    ListsComponent,
    PostComponent,
    PostsComponent,
    MenuComponent
  ],
  // Exporto mis componentes para poder usarlos 
  exports: [
    AvatarSelectComponent,
    ListItemsComponent,
    ListsComponent,
    PostsComponent,
    MenuComponent
  ],
  // Importaciones de componentes que quiero usar en mis componentes
  imports: [
    CommonModule,
    IonicModule,
    PipesModule,
    RouterModule

  ]
})

export class ComponentsModule { }
