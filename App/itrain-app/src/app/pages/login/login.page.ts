import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { UiService } from '../../services/ui.service';
import { IUser } from '../../interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slideLoginToRegister', { static: true }) slides: IonSlides;

  loginUser = {
    email: 'vgallardo@gmail.com',
    password: '123456'
  }

  registerUser: IUser = {
    email: 'test@gmail.com',
    password: '123456',
    name: 'Test',
    avatar: 'av-1.png'
  }

  slideNgIf: number = 0;


  constructor
    (
      private userService: UserService,
      private navCtrl: NavController,
      private uiService: UiService
    ) { }


  ngOnInit() {
    this.slides.lockSwipes(true);

  }

  // Login
  async login(formLogin: NgForm) {

    if (formLogin.invalid) { return; }

    const valid = await this.userService.login(this.loginUser.email, this.loginUser.password);

    if (valid) {
      // navega a main
      // this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true }); // Para ir a los Posts
      this.navCtrl.navigateRoot('/lists/lists-tabs/unfinish', { animated: true }); // Para ir a las listas


    } else {
      // Mostrar alert : usuario/contraseña no correctos
      this.uiService.alertInfo('Email o contraseña incorrectos.');

    }

  }

  // Registro
  async register(formRegister: NgForm) {

    console.log(formRegister.valid);

    if (formRegister.invalid) { return; }

    const valid = await this.userService.register(this.registerUser);
    if (valid) {
      // navega a main
      this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true });

    } else {
      // Mostrar alert : usuario/contraseña no correctos
      this.uiService.alertInfo('El correo electronico ya existe.');

    }

  }


  showLogin() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0)
    this.slides.lockSwipes(true);
    this.slideNgIf = 0
  }

  showRegister() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1)
    this.slides.lockSwipes(true);
    this.slideNgIf = 1

  }

}
