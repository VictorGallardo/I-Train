import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { AvatarSelectComponent } from './avatar-select/avatar-select.component';
import { ListsComponent } from './lists/lists.component';


@NgModule({
  // Declaro mis componentes
  declarations: [
    AvatarSelectComponent,
    ListsComponent,
    PostComponent,
    PostsComponent,
  ],
  // Exporto mis componentes para poder usarlos 
  exports: [
    AvatarSelectComponent,
    ListsComponent,
    PostsComponent,
  ],
  // Importaciones de componentes que quiero usar en mis componentes
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ]
})

export class ComponentsModule { }
