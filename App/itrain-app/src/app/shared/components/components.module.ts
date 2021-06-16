import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { AvatarSelectComponent } from './avatar-select/avatar-select.component';
import { MenuComponent } from './_menu/menu.component';
import { RouterModule } from '@angular/router';
import { ConfigPopoverComponent } from './config-popover/config-popover.component';


@NgModule({
  declarations: [
    AvatarSelectComponent,
    PostComponent,
    PostsComponent,
    MenuComponent,
    ConfigPopoverComponent
  ],
  exports: [
    AvatarSelectComponent,
    PostsComponent,
    MenuComponent,
    ConfigPopoverComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule,
    RouterModule

  ]
})

export class ComponentsModule { }
