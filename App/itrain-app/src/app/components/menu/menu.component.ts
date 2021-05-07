import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UiService } from '../../services/ui.service';
import { IUser } from '../../interfaces/interfaces';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  @Input() user: IUser = {};

  constructor(

    private userService: UserService,
    private uiService: UiService,

  ) { }


  ngOnInit(): void {


  }

  logout() {
    this.userService.logout();
  }
}