import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from '../../services/items.service';
import { IItem } from '../../interfaces/interfaces';
import { BehaviorSubject, Observable, Subscriber, Subscription, } from 'rxjs';
import { CountdownModule } from 'ngx-countdown';

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

  cRepeats: number;
  timeEx: number;
  repCont: number;
  preparation: number;
  restReps: number;
  restSets: number;

  itemId: string;

  time: BehaviorSubject<string> = new BehaviorSubject('00:00');
  percent: BehaviorSubject<number> = new BehaviorSubject(100);
  state: 'start' | 'stop' = 'stop';
  timer: number;
  interval;

  startDuration = 1;

  circleR = circleR;
  circleDasharray = circleDasharray;
  displayTime: number;
  counterPreparation: number = 1
  counterTimeEx: number;
  counterRestReps: number;

  subsPreparation: Subscription;


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
        const load = this.item = resp.items[0];
        if (load) {
          this.cRepeats = this.item.repeats;
          this.timeEx = this.item.time;
          this.repCont = this.item.repeats;
          this.preparation = this.item.preparation;
          this.restReps = this.item.restReps;
          this.restSets = this.item.restSets;
          this.displayTime = this.preparation;
          this.counterTimeEx = this.item.repeats;
          this.counterRestReps = this.item.repeats - 1;

        }
      });
  }

  // swapDuration() {
  //   this.startDuration = this.startDuration === 1 ? 0.5 : 1;
  // }

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


  stopTimer() {
    clearInterval(this.interval);
    this.time.next('00:00');
    this.state = 'stop';
  }

  playAudio01() {
    let audio = new Audio();
    audio.src = "../../assets/audio/audio01.wav";
    audio.load();
    audio.play();
  }
  playAudio02() {
    let audio = new Audio();
    audio.src = "../../assets/audio/audio02.wav";
    audio.load();
    audio.play();
  }




  // Preparación ------------------------------------------------------------------

  startPreparation(duration: number) {
    this.state = 'start';
    clearInterval(this.interval)
    this.timer = duration % 60;
    this.durationPreparation();

    this.interval = setInterval(() => {
      this.durationPreparation();
    }, 1000)
  }

  durationPreparation() {
    this.updateTimeDisplay(this.preparation)
    --this.timer;
    if (this.timer < 2 && this.timer > -1) {
      this.playAudio01()
    }
    if (this.timer < 0) {
      this.playAudio02()
    }
    if (this.timer < -1) {
      this.startExercise(this.timeEx)

    }
  }
  // -------------------------------------------------------------------------------

  // Ejercicio ---------------------------------------------------------------------

  startExercise(duration: number) {
    this.state = 'start';
    clearInterval(this.interval)
    this.timer = duration % 60;
    this.durationExercise();

    this.interval = setInterval(() => {
      this.durationExercise();
    }, 1000)
  }
  durationExercise() {
    this.updateTimeDisplay(this.timeEx)
    --this.timer;
    if (this.timer < -1) {
      this.counterTimeEx--;
      this.startRestReps(this.restReps)
      if (this.counterTimeEx === 0) {
        this.startRestSets(this.restSets)
      }
    }
  }
  // -------------------------------------------------------------------------------

  // Descanso Repeticion -----------------------------------------------------------

  startRestReps(duration: number) {
    this.state = 'start';
    clearInterval(this.interval)
    this.timer = duration % 60;
    this.durationRestReps();
    this.interval = setInterval(() => {
      this.durationRestReps();
    }, 1000)
  }
  durationRestReps() {
    this.updateTimeDisplay(this.restReps)
    --this.timer;
    if (this.timer < -1) {
      this.counterRestReps--;
      this.startExercise(this.timeEx) // Aquí en teoría debemos llar otra vez al ejercicio
    }
  }
  // --------------------------------------------------------------------------------

  startRestSets(duration: number) {
    this.state = 'start';
    clearInterval(this.interval)
    this.timer = duration % 60;
    this.durationRestSets();
    this.interval = setInterval(() => {
      this.durationRestSets();
    }, 1000)
  }
  durationRestSets() {
    this.updateTimeDisplay(this.restSets)
    --this.timer;
    if (this.timer < -1) {
      this.counterRestReps--;
      this.startExercise(this.timeEx) // Aquí en teoría debemos llar otra vez al ejercicio
    }
  }



  percentageOffset(percent) {
    const percentFloat = percent / 100;
    return circleDasharray * (1 - percentFloat)
  }

  // changeDuration(changeDuration: number) {

  //   while (this.counterPreparation > 0) {
  //     this.counterPreparation--;
  //     console.log('Entro en preparacion');
  //     if (this.counterPreparation === 0) {
  //       this.displayTime = this.timeEx;
  //     }
  //   }

  //   while (changeDuration > 0) {
  //     console.log('entramos en descanso');
  //     this.counterTimeEx--;
  //     this.startTimer(this.restReps);
  //     if (this.counterTimeEx === 0) {
  //     }
  //   }
  // }




}

































