import { Component, OnInit } from '@angular/core';
import { IList } from 'src/app/interfaces/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from '../../../services/items.service';
import { NgForm } from '@angular/forms';
import { UiService } from '../../../services/ui.service';
import { PickerController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core'
import { IItem } from '../../../interfaces/interfaces';


@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.page.html',
  styleUrls: ['./add-edit.page.scss'],
})


export class AddEditPage implements OnInit {

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
    sets: null,
    time: null,
    restSets: null,
    repeats: null,
    restReps: null,
    totalTime: null,
    list: null,

  }

  // Strings
  dots: string = ':';
  stringPreparationSec: string = '00';
  stringPreparationMin: string = '00';
  stringTimeSec: string = '00';
  stringTimeMin: string = '00';
  stringRestRepSec: string = '00';
  stringRestRepMin: string = '00';
  stringRestSetsSec: string = '00';
  stringRestSetsMin: string = '00';


  // Nubers
  preparationSec: number;
  preparationMin: number;
  timeSec: number;
  timeMin: number;
  restRepSec: number;
  restRepMin: number;
  restSetsSec: number;
  restSetsMin: number;

  created: number
  sets: number
  time: number
  restSets: number
  repeats: number
  restReps: number
  totalTime: number


  constructor
    (
      private pickerCtrl: PickerController,
      private itemsService: ItemsService,
      private actvdRoute: ActivatedRoute,
      private uiService: UiService,
      private route: Router
    ) { }


  ngOnInit() {

    this.listId = this.actvdRoute.snapshot.paramMap.get('listId');
    this.itemId = this.actvdRoute.snapshot.paramMap.get('itemId');

    if (this.itemId !== null) {
      this.buttonStatus = 'update'
      this.itemsService.getItemById(this.itemId)
        .subscribe(resp => {
          console.log(resp);
          const load = this.item = resp.items[0];
          if (load) {
            this.load = true
          }
        });
    } else {
      this.buttonStatus = 'create'
    }

  }

  // Crear Item y actualizar item

  async createdItem(formAddEdit: NgForm) {

    if (this.load === true) {

      if (formAddEdit.invalid) { return };

      const updated = await this.itemsService.updateItem(this.listId, this.itemId, this.item);
      console.info(updated);

      if (updated) {
        this.uiService.presentToast('Item actualizado correctamente')// Toast con mensaje de actualizado
        this.route.navigateByUrl(`/main/lists/items/${this.listId}`);
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
        this.route.navigateByUrl(`/main/lists/items/${this.listId}`);
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

  // Pickers

  async pickerPreparation() {
    let opts: PickerOptions = {
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Ok',
          role: 'done'
        }

      ],
      columns: [
        {
          name: 'minutes',
          options: [
            { text: '00', value: 0 },
            { text: '01', value: 1 },
            { text: '02', value: 2 },
            { text: '03', value: 3 },
            { text: '04', value: 4 },
            { text: '05', value: 5 },
            { text: '06', value: 6 },
            { text: '07', value: 7 },
            { text: '08', value: 8 },
            { text: '09', value: 9 },
            { text: '10', value: 10 },
            { text: '12', value: 12 },
            { text: '13', value: 13 },
            { text: '14', value: 14 },
            { text: '15', value: 15 },
            { text: '16', value: 16 },
            { text: '17', value: 17 },
            { text: '18', value: 18 },
            { text: '19', value: 19 },
            { text: '20', value: 20 },
            { text: '21', value: 21 },
            { text: '22', value: 22 },
            { text: '23', value: 23 },
            { text: '24', value: 24 },
            { text: '25', value: 25 },
            { text: '26', value: 26 },
            { text: '27', value: 27 },
            { text: '28', value: 28 },
            { text: '29', value: 29 },
            { text: '30', value: 30 },
            { text: '31', value: 31 },
            { text: '32', value: 32 },
            { text: '33', value: 33 },
            { text: '34', value: 34 },
            { text: '35', value: 35 },
            { text: '36', value: 36 },
            { text: '37', value: 37 },
            { text: '38', value: 38 },
            { text: '39', value: 39 },
            { text: '40', value: 40 },
            { text: '41', value: 41 },
            { text: '42', value: 42 },
            { text: '43', value: 43 },
            { text: '44', value: 44 },
            { text: '45', value: 45 },
            { text: '46', value: 46 },
            { text: '47', value: 47 },
            { text: '48', value: 48 },
            { text: '49', value: 49 },
            { text: '50', value: 50 },
            { text: '51', value: 51 },
            { text: '52', value: 52 },
            { text: '53', value: 53 },
            { text: '54', value: 54 },
            { text: '55', value: 55 },
            { text: '56', value: 56 },
            { text: '57', value: 57 },
            { text: '58', value: 58 },
            { text: '59', value: 59 },
          ]
        },
        {
          name: 'seconds',
          options: [
            { text: '00', value: 0 },
            { text: '01', value: 1 },
            { text: '02', value: 2 },
            { text: '03', value: 3 },
            { text: '04', value: 4 },
            { text: '05', value: 5 },
            { text: '06', value: 6 },
            { text: '07', value: 7 },
            { text: '08', value: 8 },
            { text: '09', value: 9 },
            { text: '10', value: 10 },
            { text: '12', value: 12 },
            { text: '13', value: 13 },
            { text: '14', value: 14 },
            { text: '15', value: 15 },
            { text: '16', value: 16 },
            { text: '17', value: 17 },
            { text: '18', value: 18 },
            { text: '19', value: 19 },
            { text: '20', value: 20 },
            { text: '21', value: 21 },
            { text: '22', value: 22 },
            { text: '23', value: 23 },
            { text: '24', value: 24 },
            { text: '25', value: 25 },
            { text: '26', value: 26 },
            { text: '27', value: 27 },
            { text: '28', value: 28 },
            { text: '29', value: 29 },
            { text: '30', value: 30 },
            { text: '31', value: 31 },
            { text: '32', value: 32 },
            { text: '33', value: 33 },
            { text: '34', value: 34 },
            { text: '35', value: 35 },
            { text: '36', value: 36 },
            { text: '37', value: 37 },
            { text: '38', value: 38 },
            { text: '39', value: 39 },
            { text: '40', value: 40 },
            { text: '41', value: 41 },
            { text: '42', value: 42 },
            { text: '43', value: 43 },
            { text: '44', value: 44 },
            { text: '45', value: 45 },
            { text: '46', value: 46 },
            { text: '47', value: 47 },
            { text: '48', value: 48 },
            { text: '49', value: 49 },
            { text: '50', value: 50 },
            { text: '51', value: 51 },
            { text: '52', value: 52 },
            { text: '53', value: 53 },
            { text: '54', value: 54 },
            { text: '55', value: 55 },
            { text: '56', value: 56 },
            { text: '57', value: 57 },
            { text: '58', value: 58 },
            { text: '59', value: 59 },
          ]
        }
      ]
    };
    let picker = await this.pickerCtrl.create(opts);
    picker.present();
    picker.onDidDismiss().then(async data => {

      let colMin = await picker.getColumn('minutes');
      let colSec = await picker.getColumn('seconds');

      this.stringPreparationMin = colMin.options[colMin.selectedIndex].text
      this.stringPreparationSec = colSec.options[colSec.selectedIndex].text
      this.dots = ':'

      this.preparationMin = colMin.options[colMin.selectedIndex].value;
      this.preparationSec = colSec.options[colSec.selectedIndex].value;

      if (this.preparationMin != 0) {
        this.item.preparation = this.preparationSec + (this.preparationMin * 60);
      } else {
        this.item.preparation = this.preparationSec;
      }
    });
  }

  async pickerTime() {
    let opts: PickerOptions = {
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Ok',
          role: 'done'
        }

      ],
      columns: [
        {
          name: 'minutes',
          options: [
            { text: '00', value: 0 },
            { text: '01', value: 1 },
            { text: '02', value: 2 },
            { text: '03', value: 3 },
            { text: '04', value: 4 },
            { text: '05', value: 5 },
            { text: '06', value: 6 },
            { text: '07', value: 7 },
            { text: '08', value: 8 },
            { text: '09', value: 9 },
            { text: '10', value: 10 },
            { text: '12', value: 12 },
            { text: '13', value: 13 },
            { text: '14', value: 14 },
            { text: '15', value: 15 },
            { text: '16', value: 16 },
            { text: '17', value: 17 },
            { text: '18', value: 18 },
            { text: '19', value: 19 },
            { text: '20', value: 20 },
            { text: '21', value: 21 },
            { text: '22', value: 22 },
            { text: '23', value: 23 },
            { text: '24', value: 24 },
            { text: '25', value: 25 },
            { text: '26', value: 26 },
            { text: '27', value: 27 },
            { text: '28', value: 28 },
            { text: '29', value: 29 },
            { text: '30', value: 30 },
            { text: '31', value: 31 },
            { text: '32', value: 32 },
            { text: '33', value: 33 },
            { text: '34', value: 34 },
            { text: '35', value: 35 },
            { text: '36', value: 36 },
            { text: '37', value: 37 },
            { text: '38', value: 38 },
            { text: '39', value: 39 },
            { text: '40', value: 40 },
            { text: '41', value: 41 },
            { text: '42', value: 42 },
            { text: '43', value: 43 },
            { text: '44', value: 44 },
            { text: '45', value: 45 },
            { text: '46', value: 46 },
            { text: '47', value: 47 },
            { text: '48', value: 48 },
            { text: '49', value: 49 },
            { text: '50', value: 50 },
            { text: '51', value: 51 },
            { text: '52', value: 52 },
            { text: '53', value: 53 },
            { text: '54', value: 54 },
            { text: '55', value: 55 },
            { text: '56', value: 56 },
            { text: '57', value: 57 },
            { text: '58', value: 58 },
            { text: '59', value: 59 },
          ]
        },
        {
          name: 'seconds',
          options: [
            { text: '00', value: 0 },
            { text: '01', value: 1 },
            { text: '02', value: 2 },
            { text: '03', value: 3 },
            { text: '04', value: 4 },
            { text: '05', value: 5 },
            { text: '06', value: 6 },
            { text: '07', value: 7 },
            { text: '08', value: 8 },
            { text: '09', value: 9 },
            { text: '10', value: 10 },
            { text: '12', value: 12 },
            { text: '13', value: 13 },
            { text: '14', value: 14 },
            { text: '15', value: 15 },
            { text: '16', value: 16 },
            { text: '17', value: 17 },
            { text: '18', value: 18 },
            { text: '19', value: 19 },
            { text: '20', value: 20 },
            { text: '21', value: 21 },
            { text: '22', value: 22 },
            { text: '23', value: 23 },
            { text: '24', value: 24 },
            { text: '25', value: 25 },
            { text: '26', value: 26 },
            { text: '27', value: 27 },
            { text: '28', value: 28 },
            { text: '29', value: 29 },
            { text: '30', value: 30 },
            { text: '31', value: 31 },
            { text: '32', value: 32 },
            { text: '33', value: 33 },
            { text: '34', value: 34 },
            { text: '35', value: 35 },
            { text: '36', value: 36 },
            { text: '37', value: 37 },
            { text: '38', value: 38 },
            { text: '39', value: 39 },
            { text: '40', value: 40 },
            { text: '41', value: 41 },
            { text: '42', value: 42 },
            { text: '43', value: 43 },
            { text: '44', value: 44 },
            { text: '45', value: 45 },
            { text: '46', value: 46 },
            { text: '47', value: 47 },
            { text: '48', value: 48 },
            { text: '49', value: 49 },
            { text: '50', value: 50 },
            { text: '51', value: 51 },
            { text: '52', value: 52 },
            { text: '53', value: 53 },
            { text: '54', value: 54 },
            { text: '55', value: 55 },
            { text: '56', value: 56 },
            { text: '57', value: 57 },
            { text: '58', value: 58 },
            { text: '59', value: 59 },
          ]
        }
      ]
    };
    let picker = await this.pickerCtrl.create(opts);
    picker.present();
    picker.onDidDismiss().then(async data => {

      let colMin = await picker.getColumn('minutes');
      let colSec = await picker.getColumn('seconds');

      this.stringTimeMin = colMin.options[colMin.selectedIndex].text
      this.stringTimeSec = colSec.options[colSec.selectedIndex].text
      this.dots = ':'

      this.timeMin = colMin.options[colMin.selectedIndex].value;
      this.timeSec = colSec.options[colSec.selectedIndex].value;

      if (this.timeMin != 0) {
        this.item.time = this.timeSec + (this.timeMin * 60);
      } else {
        this.item.time = this.timeSec;
      }

    });
  }

  async pickerRestRep() {
    let opts: PickerOptions = {
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Ok',
          role: 'done'
        }

      ],
      columns: [
        {
          name: 'minutes',
          options: [
            { text: '00', value: 0 },
            { text: '01', value: 1 },
            { text: '02', value: 2 },
            { text: '03', value: 3 },
            { text: '04', value: 4 },
            { text: '05', value: 5 },
            { text: '06', value: 6 },
            { text: '07', value: 7 },
            { text: '08', value: 8 },
            { text: '09', value: 9 },
            { text: '10', value: 10 },
            { text: '12', value: 12 },
            { text: '13', value: 13 },
            { text: '14', value: 14 },
            { text: '15', value: 15 },
            { text: '16', value: 16 },
            { text: '17', value: 17 },
            { text: '18', value: 18 },
            { text: '19', value: 19 },
            { text: '20', value: 20 },
            { text: '21', value: 21 },
            { text: '22', value: 22 },
            { text: '23', value: 23 },
            { text: '24', value: 24 },
            { text: '25', value: 25 },
            { text: '26', value: 26 },
            { text: '27', value: 27 },
            { text: '28', value: 28 },
            { text: '29', value: 29 },
            { text: '30', value: 30 },
            { text: '31', value: 31 },
            { text: '32', value: 32 },
            { text: '33', value: 33 },
            { text: '34', value: 34 },
            { text: '35', value: 35 },
            { text: '36', value: 36 },
            { text: '37', value: 37 },
            { text: '38', value: 38 },
            { text: '39', value: 39 },
            { text: '40', value: 40 },
            { text: '41', value: 41 },
            { text: '42', value: 42 },
            { text: '43', value: 43 },
            { text: '44', value: 44 },
            { text: '45', value: 45 },
            { text: '46', value: 46 },
            { text: '47', value: 47 },
            { text: '48', value: 48 },
            { text: '49', value: 49 },
            { text: '50', value: 50 },
            { text: '51', value: 51 },
            { text: '52', value: 52 },
            { text: '53', value: 53 },
            { text: '54', value: 54 },
            { text: '55', value: 55 },
            { text: '56', value: 56 },
            { text: '57', value: 57 },
            { text: '58', value: 58 },
            { text: '59', value: 59 },
          ]
        },
        {
          name: 'seconds',
          options: [
            { text: '00', value: 0 },
            { text: '01', value: 1 },
            { text: '02', value: 2 },
            { text: '03', value: 3 },
            { text: '04', value: 4 },
            { text: '05', value: 5 },
            { text: '06', value: 6 },
            { text: '07', value: 7 },
            { text: '08', value: 8 },
            { text: '09', value: 9 },
            { text: '10', value: 10 },
            { text: '12', value: 12 },
            { text: '13', value: 13 },
            { text: '14', value: 14 },
            { text: '15', value: 15 },
            { text: '16', value: 16 },
            { text: '17', value: 17 },
            { text: '18', value: 18 },
            { text: '19', value: 19 },
            { text: '20', value: 20 },
            { text: '21', value: 21 },
            { text: '22', value: 22 },
            { text: '23', value: 23 },
            { text: '24', value: 24 },
            { text: '25', value: 25 },
            { text: '26', value: 26 },
            { text: '27', value: 27 },
            { text: '28', value: 28 },
            { text: '29', value: 29 },
            { text: '30', value: 30 },
            { text: '31', value: 31 },
            { text: '32', value: 32 },
            { text: '33', value: 33 },
            { text: '34', value: 34 },
            { text: '35', value: 35 },
            { text: '36', value: 36 },
            { text: '37', value: 37 },
            { text: '38', value: 38 },
            { text: '39', value: 39 },
            { text: '40', value: 40 },
            { text: '41', value: 41 },
            { text: '42', value: 42 },
            { text: '43', value: 43 },
            { text: '44', value: 44 },
            { text: '45', value: 45 },
            { text: '46', value: 46 },
            { text: '47', value: 47 },
            { text: '48', value: 48 },
            { text: '49', value: 49 },
            { text: '50', value: 50 },
            { text: '51', value: 51 },
            { text: '52', value: 52 },
            { text: '53', value: 53 },
            { text: '54', value: 54 },
            { text: '55', value: 55 },
            { text: '56', value: 56 },
            { text: '57', value: 57 },
            { text: '58', value: 58 },
            { text: '59', value: 59 },
          ]
        }
      ]
    };
    let picker = await this.pickerCtrl.create(opts);
    picker.present();
    picker.onDidDismiss().then(async data => {

      let colMin = await picker.getColumn('minutes');
      let colSec = await picker.getColumn('seconds');

      this.stringRestRepMin = colMin.options[colMin.selectedIndex].text
      this.stringRestRepSec = colSec.options[colSec.selectedIndex].text
      this.dots = ':'

      this.restRepMin = colMin.options[colMin.selectedIndex].value;
      this.restRepSec = colSec.options[colSec.selectedIndex].value;

      if (this.restRepMin != 0) {
        this.item.restReps = this.restRepSec + (this.restRepMin * 60);
      } else {
        this.item.restReps = this.restRepSec;
      }

    });
  }

  async pickerRestSSets() {
    let opts: PickerOptions = {
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Ok',
          role: 'done'
        }

      ],
      columns: [
        {
          name: 'minutes',
          options: [
            { text: '00', value: 0 },
            { text: '01', value: 1 },
            { text: '02', value: 2 },
            { text: '03', value: 3 },
            { text: '04', value: 4 },
            { text: '05', value: 5 },
            { text: '06', value: 6 },
            { text: '07', value: 7 },
            { text: '08', value: 8 },
            { text: '09', value: 9 },
            { text: '10', value: 10 },
            { text: '12', value: 12 },
            { text: '13', value: 13 },
            { text: '14', value: 14 },
            { text: '15', value: 15 },
            { text: '16', value: 16 },
            { text: '17', value: 17 },
            { text: '18', value: 18 },
            { text: '19', value: 19 },
            { text: '20', value: 20 },
            { text: '21', value: 21 },
            { text: '22', value: 22 },
            { text: '23', value: 23 },
            { text: '24', value: 24 },
            { text: '25', value: 25 },
            { text: '26', value: 26 },
            { text: '27', value: 27 },
            { text: '28', value: 28 },
            { text: '29', value: 29 },
            { text: '30', value: 30 },
            { text: '31', value: 31 },
            { text: '32', value: 32 },
            { text: '33', value: 33 },
            { text: '34', value: 34 },
            { text: '35', value: 35 },
            { text: '36', value: 36 },
            { text: '37', value: 37 },
            { text: '38', value: 38 },
            { text: '39', value: 39 },
            { text: '40', value: 40 },
            { text: '41', value: 41 },
            { text: '42', value: 42 },
            { text: '43', value: 43 },
            { text: '44', value: 44 },
            { text: '45', value: 45 },
            { text: '46', value: 46 },
            { text: '47', value: 47 },
            { text: '48', value: 48 },
            { text: '49', value: 49 },
            { text: '50', value: 50 },
            { text: '51', value: 51 },
            { text: '52', value: 52 },
            { text: '53', value: 53 },
            { text: '54', value: 54 },
            { text: '55', value: 55 },
            { text: '56', value: 56 },
            { text: '57', value: 57 },
            { text: '58', value: 58 },
            { text: '59', value: 59 },
          ]
        },
        {
          name: 'seconds',
          options: [
            { text: '00', value: 0 },
            { text: '01', value: 1 },
            { text: '02', value: 2 },
            { text: '03', value: 3 },
            { text: '04', value: 4 },
            { text: '05', value: 5 },
            { text: '06', value: 6 },
            { text: '07', value: 7 },
            { text: '08', value: 8 },
            { text: '09', value: 9 },
            { text: '10', value: 10 },
            { text: '12', value: 12 },
            { text: '13', value: 13 },
            { text: '14', value: 14 },
            { text: '15', value: 15 },
            { text: '16', value: 16 },
            { text: '17', value: 17 },
            { text: '18', value: 18 },
            { text: '19', value: 19 },
            { text: '20', value: 20 },
            { text: '21', value: 21 },
            { text: '22', value: 22 },
            { text: '23', value: 23 },
            { text: '24', value: 24 },
            { text: '25', value: 25 },
            { text: '26', value: 26 },
            { text: '27', value: 27 },
            { text: '28', value: 28 },
            { text: '29', value: 29 },
            { text: '30', value: 30 },
            { text: '31', value: 31 },
            { text: '32', value: 32 },
            { text: '33', value: 33 },
            { text: '34', value: 34 },
            { text: '35', value: 35 },
            { text: '36', value: 36 },
            { text: '37', value: 37 },
            { text: '38', value: 38 },
            { text: '39', value: 39 },
            { text: '40', value: 40 },
            { text: '41', value: 41 },
            { text: '42', value: 42 },
            { text: '43', value: 43 },
            { text: '44', value: 44 },
            { text: '45', value: 45 },
            { text: '46', value: 46 },
            { text: '47', value: 47 },
            { text: '48', value: 48 },
            { text: '49', value: 49 },
            { text: '50', value: 50 },
            { text: '51', value: 51 },
            { text: '52', value: 52 },
            { text: '53', value: 53 },
            { text: '54', value: 54 },
            { text: '55', value: 55 },
            { text: '56', value: 56 },
            { text: '57', value: 57 },
            { text: '58', value: 58 },
            { text: '59', value: 59 },
          ]
        }
      ]
    };
    let picker = await this.pickerCtrl.create(opts);
    picker.present();
    picker.onDidDismiss().then(async data => {

      let colMin = await picker.getColumn('minutes');
      let colSec = await picker.getColumn('seconds');

      this.stringRestSetsMin = colMin.options[colMin.selectedIndex].text
      this.stringRestSetsSec = colSec.options[colSec.selectedIndex].text
      this.dots = ':'

      this.restSetsMin = colMin.options[colMin.selectedIndex].value;
      this.restSetsSec = colSec.options[colSec.selectedIndex].value;

      if (this.restSetsMin != 0) {
        this.item.restSets = this.restSetsSec + (this.restSetsMin * 60);
      } else {
        this.item.restSets = this.restSetsSec;
      }

    });
  }





}
