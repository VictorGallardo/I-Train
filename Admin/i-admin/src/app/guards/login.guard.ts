import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable()
export class LoginGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  canActivate() {

    if (this.authService.validateToken()) {
      console.log('Usuario registrado');
      return true;
    } else {
      console.log('Usuario no registrado, bloqueado por guard');
      this.router.navigate(['/login']);
      return false;
    }

  }
}
