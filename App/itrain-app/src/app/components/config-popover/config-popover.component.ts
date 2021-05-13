import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-config-popover',
  templateUrl: './config-popover.component.html',
  styleUrls: ['./config-popover.component.scss'],
})
export class ConfigPopoverComponent implements OnInit {


  constructor(private popoverCtrl: PopoverController) { }

  ngOnInit() { }

  onClickItem(value: number) {

    this.popoverCtrl.dismiss({
      value
    });

  }
}
