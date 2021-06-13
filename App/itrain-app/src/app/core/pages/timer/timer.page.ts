import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from '../../../shared/services/items.service';
import { IItem } from '../../../shared/interfaces/interfaces';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ModalController, PopoverController, NavController, AlertController } from '@ionic/angular';
import { TimerEndPage } from '../../modals/timer-end/timer-end.page';
import { ConfigPopoverComponent } from 'src/app/shared/components/config-popover/config-popover.component';
import { Platform } from '@ionic/angular';
import { BackButtonService } from '../../../shared/services/back-button.service';
import { Plugins } from '@capacitor/core';
import { UiService } from '../../../shared/services/ui.service';

const { App } = Plugins;


const circleR = 80;
const circleDasharray = 2 * Math.PI * circleR;


@Component({
  selector: 'app-timer',
  templateUrl: './timer.page.html',
  styleUrls: ['./timer.page.scss'],
})
export class TimerPage implements OnInit {

  item: IItem = {
    title: '',
    description: '',
    preparation: null,
    sets: null,
    time: null,
    restSets: null,
    repeats: null,
    restReps: null,
    totalTime: null,
  }

  itemArray: IItem[] = [];

  itemId: string;

  percent: BehaviorSubject<number> = new BehaviorSubject(100);
  time: BehaviorSubject<string> = new BehaviorSubject('00:00');

  state: 'start' | 'stop' = 'stop';
  circleDasharray = circleDasharray;
  circleR = circleR;
  audio = new Audio();

  timeEx: number;
  restReps: number;
  restSets: number;
  displayStage: string = 'Preparación';
  displayColor: string;
  onlyDigits: boolean = false;
  noFeatures: boolean = false;
  mute: boolean = false;

  preparation: number;
  preparationMin: number;
  preparationSec: number;

  interval;

  timer: number;

  startDuration = 1;

  counterPreparation: number = 1
  counterRestReps: number;
  counterRestSets: number;
  counterTimeEx: number;
  counterSets: number

  constructor(
    public popoverCtrl: PopoverController,
    private itemsService: ItemsService,
    public modalCtrl: ModalController,
    private actvRoute: ActivatedRoute,
    public platform: Platform,


  ) { }


  ngOnInit() {

    this.itemId = this.actvRoute.snapshot.paramMap.get('itemId');
    console.log(this.itemId + ' Entrando al timer ');

    this.itemsService.getItemById(this.itemId)
      .subscribe(resp => {
        // Lo añado a un array por si hay retraso en la respuesta
        this.itemArray.push(...resp.items)
        const load = this.item = this.itemArray[0];
        if (load) {
          this.updateCountersAndDuration()
        }
      });
  }

  ngOnDestroy() {

    clearInterval(this.interval);
    this.time.next('00:00');
    this.updateCountersAndDuration();

  }


  updateCountersAndDuration() {
    // Duration
    this.preparation = this.item.preparation;
    this.timeEx = this.item.time;
    this.restReps = this.item.restReps;
    this.restSets = this.item.restSets;

    // Counters
    this.counterSets = this.item.sets;
    this.counterTimeEx = this.item.repeats * this.counterSets;
    this.counterRestReps = this.item.repeats - 1;
  }


  // Actualiza la duración

  updateTimeDisplay(durationPercent: number) {
    let minutes: any = this.timer / 60;
    let seconds: any = this.timer % 60;
    minutes = String('0' + Math.floor(minutes)).slice(-2);
    seconds = String('0' + Math.floor(seconds)).slice(-2);
    const text = minutes + ':' + seconds;
    this.time.next(text);
    const totalTime = this.startDuration * durationPercent;
    const percentage = ((totalTime - this.timer) / totalTime) * 100;
    this.percent.next(percentage);
  }


  // Preparación ------------------------------------------------------------------

  startPreparation(duration: number) {
    this.displayColor = 'restOut';
    console.log('Entramos en preparación');
    this.displayStage = 'Preparación'
    this.state = 'start';
    clearInterval(this.interval)
    this.timer = duration;
    this.durationPreparation();

    this.interval = setInterval(() => {
      this.durationPreparation();
    }, 1000)
  }

  durationPreparation() {
    this.updateTimeDisplay(this.preparation)
    --this.timer;

    if (this.timer < 2 && this.timer >= -1) {
      this.playAudio("../../assets/audio/audio02.wav")
    }
    if (this.timer < -1) {
      this.playAudio("../../assets/audio/audio04.wav")
    }
    //_________________________________________
    if (this.timer < -1) {
      this.startExercise(this.timeEx)

    }
  }
  // -------------------------------------------------------------------------------

  // Ejercicio ---------------------------------------------------------------------

  startExercise(duration: number) {
    console.log('Entramos en Ejercicio');
    this.displayColor = 'Rest';
    this.state = 'start';
    this.displayStage = 'Ejercicio'
    clearInterval(this.interval)
    this.timer = duration;
    this.durationExercise();

    this.interval = setInterval(() => {
      this.durationExercise();
    }, 1000)
  }
  durationExercise() {
    this.updateTimeDisplay(this.timeEx)
    --this.timer;
    if (this.timer < 2 && this.timer >= -1) {
      this.playAudio("../../assets/audio/audio02.wav")
    }
    if (this.timer < -1) {
      this.playAudio("../../assets/audio/audio05.wav")
    }
    if (this.timer < -1) {
      this.counterTimeEx--;
      this.startRestReps(this.restReps)
      if (this.counterTimeEx === this.counterSets) {
        this.startRestSets(this.restSets)             // Empieza el descanso entre Series
        if (this.counterSets === 1) {
          this.stopTimer()
          this.updateCountersAndDuration();
          this.modalEnd()

        }
      }
    }
  }
  // -------------------------------------------------------------------------------

  // Descanso Repeticion -----------------------------------------------------------

  startRestReps(duration: number) {
    console.log('Entramos en descanso repeticiones');
    this.displayColor = 'Ex';
    this.state = 'start';
    this.displayStage = 'Descanso'
    clearInterval(this.interval)
    this.timer = duration;
    this.durationRestReps();
    this.interval = setInterval(() => {
      this.durationRestReps();
    }, 1000)
  }
  durationRestReps() {
    this.updateTimeDisplay(this.restReps)
    --this.timer;
    if (this.timer < 2 && this.timer >= -1) {
      this.playAudio("../../assets/audio/audio02.wav")
    }
    if (this.timer < -1) {
      this.playAudio("../../assets/audio/audio04.wav")
    }
    if (this.timer < -1) {
      this.counterRestReps--;
      this.startExercise(this.timeEx)
    }
  }
  // --------------------------------------------------------------------------------

  // Descanso Series ----------------------------------------------------------------

  startRestSets(duration: number) {
    console.log('Entramos en descanso series');
    this.displayColor = 'restOut';
    this.state = 'start';
    this.displayStage = 'Descanso Serie'
    clearInterval(this.interval)
    this.timer = duration;
    this.durationRestSets();
    this.interval = setInterval(() => {
      this.durationRestSets();
    }, 1000)
  }
  durationRestSets() {
    this.updateTimeDisplay(this.restSets)
    --this.timer;
    if (this.timer < 2 && this.timer >= -1) {
      this.playAudio("../../assets/audio/audio02.wav")
    }
    if (this.timer < -1) {
      this.playAudio("../../assets/audio/audio04.wav")
    }
    if (this.timer < -1) {
      this.counterSets--;
      this.counterTimeEx++;
      this.startExercise(this.timeEx)
    }
  }
  // --------------------------------------------------------------------------------


  // Muestra el modal de final del ejercicio
  async modalEnd() {
    const modal = await this.modalCtrl.create({
      cssClass: 'modal-end',
      component: TimerEndPage,

    });
    return await modal.present();
  }


  // Play audio
  playAudio(url: string) {
    let audio = new Audio();
    audio.src = url;
    audio.load();
    audio.play();
  }


  // Porcentage
  percentageOffset(percent) {
    const percentFloat = percent / 100;
    return circleDasharray * (1 - percentFloat)
  }

  // Stop timer
  stopTimer() {
    clearInterval(this.interval);
    this.time.next('00:00');
    this.updateCountersAndDuration();
    this.state = 'stop';
  }

  // // Popover de configuracion
  // async openConfigPopover(ev: any) {
  //   const popover = await this.popoverCtrl.create({
  //     component: ConfigPopoverComponent,
  //     event: ev,
  //     translucent: true
  //   });
  //   await popover.present();

  //   const { data } = await popover.onWillDismiss();

  //   if (data) {
  //     if (data.value === 1) this.mute = true;
  //     if (data.value === 2) this.onlyDigits = true;
  //     if (data.value === 3) this.noFeatures = true;
  //   }

  // }



  // -------------------------------------------------------------------------------------
}
