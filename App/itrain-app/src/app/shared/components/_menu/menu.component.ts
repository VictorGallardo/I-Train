import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUser } from '../../interfaces/interfaces';
import { ListsService } from '../../services/lists.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {

  @Input() user: IUser;

  constructor(

    private userService: UserService,
    private listService: ListsService

  ) { }

  logout() {
    this.listService.listPage = 0;
    this.userService.logout();
  }
}
