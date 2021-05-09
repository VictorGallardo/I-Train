import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
// import * as swal from 'sweetalert'
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  checked: boolean = false;

  loginUser = {
    email: '',
    password: ''
  }

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {

    // Obtenemos el email del local storage
    this.loginUser.email = localStorage.getItem('email') || '';
    // Marcamos el checkbox si hay algo escrito
    if (this.loginUser.email.length > 1) {
      this.checked = true
    }

  }

  // Login
  async login(form: NgForm) {

    if (form.invalid) { return; }

    const valid = await this.authService.login(this.loginUser.email, this.loginUser.password, this.checked);

    if (valid) {
      this.router.navigate(['/dashboard'])
    }


  }

}
