import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {


  loginUser = {
    email: '',
    password: ''
  }


  constructor(private authService: AuthService) { }

  ngOnInit(): void {

    this.loginUser.email = localStorage.getItem('email') || '';
  }



}
