import { Component, Input, OnInit } from '@angular/core';
import { IPost } from '../../interfaces/interfaces';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  @Input() post: IPost = {};

  slideOpts = {
    allowSlideNext: false,
    allowSlidePrev: false
  };


  constructor() { }

  ngOnInit() { }

}
