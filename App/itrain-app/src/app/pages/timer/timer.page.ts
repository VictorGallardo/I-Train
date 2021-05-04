import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from '../../services/items.service';
import { IItem } from '../../interfaces/interfaces';
import { BehaviorSubject } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { TimerEndPage } from '../../modals/timer-end/timer-end.page';

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
    private actvRoute: ActivatedRoute,
    private itemsService: ItemsService,
    private modalCtrl: ModalController
  ) { }


  ngOnInit() {

    this.itemId = this.actvRoute.snapshot.paramMap.get('itemId');
    console.log(this.itemId + ' Entrando al timer ');

    this.itemsService.getItemById(this.itemId)
      .subscribe(resp => {
        console.log(resp);
        const load = this.item = resp.items[0];
        if (load) {
          this.updateCountersAndDuration()
        }
      });
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


  async modalEnd() {
    const modal = await this.modalCtrl.create({
      component: TimerEndPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }


  playAudio(url: string) {
    let audio = new Audio();
    audio.src = url;
    audio.load();
    audio.play();
  }


  percentageOffset(percent) {
    const percentFloat = percent / 100;
    return circleDasharray * (1 - percentFloat)
  }

  stopTimer() {
    clearInterval(this.interval);
    this.time.next('00:00');
    this.updateCountersAndDuration();
    this.state = 'stop';
  }


}

































