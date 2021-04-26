import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from '../../services/items.service';
import { IItem } from '../../interfaces/interfaces';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.page.html',
  styleUrls: ['./timer.page.scss'],
})
export class TimerPage implements OnInit {

  item: IItem[] = []
  itemId: string;
  itemTitle: string
  time: number;

  constructor(
    private actvRoute: ActivatedRoute,
    private itemsService: ItemsService,
  ) { }

  ngOnInit() {

    this.itemId = this.actvRoute.snapshot.paramMap.get('itemId');
    console.log(this.itemId + ' Entrando al timer ');

    this.itemsService.getItemById(this.itemId)
      .subscribe(resp => {
        console.log(resp);

      });





  }

}
