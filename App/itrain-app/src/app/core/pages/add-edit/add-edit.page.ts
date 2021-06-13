import { Component, OnDestroy, OnInit } from '@angular/core';
import { IList } from 'src/app/shared/interfaces/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from '../../../shared/services/items.service';
import { NgForm } from '@angular/forms';
import { UiService } from '../../../shared/services/ui.service';
import { PickerController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core'
import { IItem } from '../../../shared/interfaces/interfaces';


@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.page.html',
  styleUrls: ['./add-edit.page.scss'],
})


export class AddEditPage implements OnInit, OnDestroy {

  list: IList;
  listId: string;
  itemId: string;

  buttonStatus: string;
  buttonType: string;
  load: boolean;

  item: IItem = {
    title: '',
    description: '',
    created: null,
    completed: false,
    preparation: null,
    sets: 2,
    time: null,
    restSets: null,
    repeats: 2,
    restReps: null,
    totalTime: null,
    list: null,

  }

  // Nubers
  preparationSec: number = 0;
  preparationMin: number = 0;
  timeSec: number = 0;
  timeMin: number = 0;
  restRepsSec: number = 0;
  restRepsMin: number = 0;
  restSetsSec: number = 0;
  restSetsMin: number = 0;

  date: any = new Date().toISOString()


  constructor
    (
      private itemsService: ItemsService,
      private actvdRoute: ActivatedRoute,
      private uiService: UiService,
      private route: Router
    ) { }


  ngOnDestroy(): void {

  }


  ngOnInit() {

    this.listId = this.actvdRoute.snapshot.paramMap.get('listId');
    this.itemId = this.actvdRoute.snapshot.paramMap.get('itemId');

    if (this.itemId !== null) {
      this.buttonStatus = 'update'
      this.itemsService.getItemById(this.itemId)
        .subscribe(resp => {

          const rItem = resp.items[0];

          const load = this.item = rItem;
          this.preparationMin = Math.trunc(rItem.preparation / 60);
          this.preparationSec = rItem.preparation %= 60
          this.timeMin = Math.trunc(rItem.time / 60);
          this.timeSec = rItem.time %= 60
          this.restRepsMin = Math.trunc(rItem.restReps / 60);
          this.restRepsSec = rItem.restReps %= 60
          this.restSetsMin = Math.trunc(rItem.restSets / 60);
          this.restSetsSec = rItem.restSets %= 60

          if (load) {
            this.load = true
          }
        });
    } else {
      this.buttonStatus = 'create'
    }

  }

  addTime(option: string) {

    switch (option) {

      case 'preparationMin':
        if (this.preparationMin === 59) {
          this.preparationMin = 0;
        } else {
          this.preparationMin++
        }
        break;

      case 'preparationSec':
        if (this.preparationSec === 59) {
          this.preparationSec = 0;
        } else {
          this.preparationSec++
        }
        break;

      case 'timeMin':
        if (this.timeMin === 59) {
          this.timeMin = 0;
        } else {
          this.timeMin++
        }
        break;

      case 'timeSec':
        if (this.timeSec === 59) {
          this.timeSec = 0;
        } else {
          this.timeSec++
        }
        break;

      case 'restSetsMin':

        if (this.restSetsMin === 59) {
          this.restSetsMin = 0;
        } else {
          this.restSetsMin++
        }
        break;

      case 'restSetsSec':
        if (this.restSetsSec === 59) {
          this.restSetsSec = 0;
        } else {
          this.restSetsSec++;
        }
        break;

      case 'restRepsMin':
        if (this.restRepsMin === 59) {
          this.restRepsMin = 0;
        } else {
          this.restRepsMin++
        }
        break;

      case 'restRepsSec':
        if (this.restRepsSec === 59) {
          this.restRepsSec = 0;
        } else {
          this.restRepsSec++
        }
        break;

      case 'repeats':
        if (this.item.repeats === 100) {
          this.item.repeats = 2;
        } else {
          this.item.repeats++
        }
        break;

      case 'sets':
        if (this.item.sets === 100) {
          this.item.sets = 2;
        } else {
          this.item.sets++
        }
        break;

      default:
        break;
    }

  }

  removeTime(option: string) {

    switch (option) {

      case 'preparationMin':
        if (this.preparationMin === 0) {
          this.preparationMin = 59;
        } else {
          this.preparationMin--;
        }
        break;
      case 'preparationSec':
        if (this.preparationSec === 0) {
          this.preparationSec = 59;
        } else {
          this.preparationSec--;
        }
        break;

      case 'timeMin':
        if (this.timeMin === 0) {
          this.timeMin = 59;
        } else {
          this.timeMin--;
        }
        break;
      case 'timeSec':
        if (this.timeSec === 0) {
          this.timeSec = 59;
        } else {
          this.timeSec--;
        }
        break;

      case 'restSetsMin':
        if (this.restSetsMin === 0) {
          this.restSetsMin = 59;
        } else {
          this.restSetsMin--;
        }
        break;
      case 'restSetsSec':
        if (this.restSetsSec === 0) {
          this.restSetsSec = 59;
        } else {
          this.restSetsSec--;
        }
        break;

      case 'restRepsMin':
        if (this.restRepsMin === 0) {
          this.restRepsMin = 59;
        } else {
          this.restRepsMin--;
        }
        break;
      case 'restRepsSec':
        if (this.restRepsSec === 0) {
          this.restRepsSec = 59;
        } else {
          this.restRepsSec--;
        }
        break;

      case 'repeats':
        if (this.item.repeats === 2) {
          this.item.repeats = 100;
        } else {
          this.item.repeats--;
        }
        break;
      case 'sets':
        if (this.item.sets === 2) {
          this.item.sets = 100;
        } else {
          this.item.sets--;
        }
        break;

      default:
        break;
    }

  }
  // Crear Item y actualizar item

  async createdItem(formAddEdit: NgForm) {

    if (this.preparationMin != 0) {
      this.item.preparation = this.preparationSec + (this.preparationMin * 60);
    } else {
      this.item.preparation = this.preparationSec;
    }

    if (this.restSetsMin != 0) {
      this.item.restSets = this.restSetsSec + (this.restSetsMin * 60);
    } else {
      this.item.restSets = this.restSetsSec;
    }

    if (this.timeMin != 0) {
      this.item.time = this.timeSec + (this.timeMin * 60);
    } else {
      this.item.time = this.timeSec;
    }

    if (this.restRepsMin != 0) {
      this.item.restReps = this.restRepsSec + (this.restRepsMin * 60);
    } else {
      this.item.restReps = this.restRepsSec;
    }


    if (this.load === true) {

      if (formAddEdit.invalid) { return };

      const updated = await this.itemsService.updateItem(this.listId, this.itemId, this.item);
      console.info(updated);

      if (updated) {
        this.uiService.presentToast('Item actualizado correctamente')// Toast con mensaje de actualizado
        this.route.navigateByUrl(`/main/tabs/items/${this.listId}`);
      } else {
        this.uiService.presentToast('Error al actualizar item')
      }

    } else {

      if (formAddEdit.invalid) { return; }
      console.log(this.item);

      // Total Time


      const valid = await this.itemsService.createdItem(this.item, this.listId);

      if (valid) {

        // Volvemos a la lista de items
        this.route.navigateByUrl(`/main/tabs/items/${this.listId}`);
        console.log('Mandamos el listId respuesta --> ' + this.listId);

        // Purgamos el objeto para dejarlo vacio
        this.item = {
          title: '',
          description: '',
          created: null,
          completed: false,
          preparation: null,
          sets: null,
          time: null,
          restSets: null,
          repeats: null,
          restReps: null,
          totalTime: null,
          list: null,

        }

      } else {
        this.uiService.alertInfo('Error al crear ejercicio');
      }
    }
  }




}
