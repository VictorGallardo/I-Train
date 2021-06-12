import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { IonSlides, NavController, LoadingController, AlertController, ModalController } from '@ionic/angular';
import { UserService } from '../shared/services/user.service';
import { UiService } from '../shared/services/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slideLoginToRegister', { static: true }) slides: IonSlides;

  avatar: string;
  password2: string;
  passCheck: boolean;

  slideNgIf: number = 0;
  loading: HTMLIonLoadingElement;

  constructor
    (
      private loadingCtrl: LoadingController,
      private userService: UserService,
      private navCtrl: NavController,
      private uiService: UiService,
      private formBuilder: FormBuilder,
      private modalCtrl: ModalController
    ) { }

  loginUser = this.formBuilder.group({
    email: ['', Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    ])],
    password: ['', Validators.compose([
      Validators.required,
      Validators.minLength(6)
    ])],
  })

  registerUser = this.formBuilder.group({
    email: ['', Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    ])],
    name: ['', Validators.required],
    password: ['', Validators.compose([
      Validators.required,
      Validators.minLength(6)
    ])],
    avatar: ['']
  });



  ngOnInit() {
    this.slides.lockSwipes(true);
    console.log(this.avatar + ' eL AVATAR');


  }


  async presentLoading(msg: string) {
    this.loading = await this.loadingCtrl.create({
      cssClass: 'ion-loading-class',
      spinner: 'bubbles',
      message: msg,

    });
    await this.loading.present();

  }


  // Login
  async login() {


    if (this.loginUser.invalid) {
      this.uiService.alertInfo('Todos los campos son requeridos.');
      return;
    }

    this.presentLoading('Cargando...')

    const valid = await this.userService.login(this.loginUser.get('email').value, this.loginUser.get('password').value);

    if (valid) {
      // navega a main
      this.loading.dismiss()
      // this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true }); // Para ir a los Posts
      this.navCtrl.navigateRoot('/main/tabs/home', { animated: true }); // Para ir a las listas

    } else {
      // Mostrar alert : usuario/contraseña no correctos
      this.loading.dismiss()
      this.uiService.alertInfo('Email o contraseña incorrectos.');

    }

  }

  // Registro
  async register() {

    if (this.registerUser.invalid) {
      this.uiService.alertInfo('Todos los campos son requeridos.');
      return;
    }

    const checkPass = await this.checkPassword();

    if (checkPass) {

      this.presentLoading('Creando usuario...')
      this.registerUser.get('avatar').setValue(this.avatar);

      const valid = await this.userService.register(this.registerUser.getRawValue());

      if (valid) {
        // navega a main
        this.loading.dismiss()
        this.navCtrl.navigateRoot('/main/tabs/home', { animated: true });

      } else {
        // Mostrar alert : usuario/contraseña no correctos
        this.loading.dismiss()
        this.uiService.alertInfo('El correo electronico ya existe.');

      }

    } else {

      this.uiService.alertInfo("Las contraseñas no coinciden:   Por favor vuelva a intentarlo.");

    }


  }

  // Compara contraseñas
  async checkPassword() {

    if (this.registerUser.get('password').value === '') {

      this.uiService.alertInfo("Por favor introduzca una contraseña");

    } else if (this.password2 == '') {

      this.uiService.alertInfo("Por favor confirme la contraseña");

    } else if (this.registerUser.get('password').value != this.password2) {

      return false;

    } else {

      return true;

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
