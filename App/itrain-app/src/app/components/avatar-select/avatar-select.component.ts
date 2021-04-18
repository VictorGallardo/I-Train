import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-avatar-select',
  templateUrl: './avatar-select.component.html',
  styleUrls: ['./avatar-select.component.scss'],
})
export class AvatarSelectComponent implements OnInit {

  @Output() avatarSelect = new EventEmitter<string>();
  @Input() currentAvatar: string = "av-1.png"


  avatars = [
    {
      img: 'av-1.png',
      seleccionado: true,
    },
    {
      img: 'av-2.png',
      seleccionado: false,
    },
    {
      img: 'av-3.png',
      seleccionado: false,
    },
    {
      img: 'av-4.png',
      seleccionado: false,
    },
    {
      img: 'av-5.png',
      seleccionado: false,
    },
    {
      img: 'av-6.png',
      seleccionado: false,
    },
    {
      img: 'av-7.png',
      seleccionado: false,
    },
    {
      img: 'av-8.png',
      seleccionado: false,
    },
  ];

  avatarSlide = {
    slidesPerView: 3.5,
  };

  constructor() { }

  ngOnInit() {

    this.avatars.forEach((av) => (av.seleccionado = false));

    for (const avatar of this.avatars) {
      if (avatar.img === this.currentAvatar) {
        avatar.seleccionado = true;
        break;
      }
    }


  }

  // Avatar seleccionado
  avatarSelected(avatar) {

    this.avatars.forEach((av) => (av.seleccionado = false));
    avatar.seleccionado = true;

    // Esto manda el la imagen del avatar mediante el @Output
    this.avatarSelect.emit(avatar.img);
    console.log(avatar.img);
  }
}
