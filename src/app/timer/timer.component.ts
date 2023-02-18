import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { timer, Subscription, interval, of, Observable, combineLatest } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

const colors = {
  green: 'base-timer__path-remaining green',
  orange: 'base-timer__path-remaining orange',
  red: 'base-timer__path-remaining red',
}

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy {
  //radius timer max
  readonly MAX_LENGTH = 283
  //timer
  source = interval(1000)
  sub: Subscription | null = null
  time: number = 0
  //style
  colorClass = colors.green
  //current leng
  leng = this.MAX_LENGTH
  //inputs
  @Input() endTime: number | undefined
  @Output() timerStop = new EventEmitter()
  
  constructor() { }

  ngOnDestroy(): void {
    this.time = 0
    this.sub?.unsubscribe()
    this.sub = null
  }
  
  ngOnInit(): void {

    if(this.endTime === undefined) {
      this.endTime = 0
    }

    this.sub = this.source.pipe(
        takeUntil(timer(this.endTime + 1000),
      )).subscribe(el => {
        this.time++
        if(this.endTime === undefined) {
          this.endTime = 0
        }
        if(this.time*1000 === this.endTime){
          this.timerStop.emit()
        }
        this.setLeng(this.time, this.endTime)
      })
  }

  setLeng(current: number, max: number) {

    if(this.endTime === undefined) {
      this.endTime = 0
    }
    
    let koef = (max - current * 1000 - 1000) / max
    this.leng = (this.MAX_LENGTH * koef)
    this.setColor(koef)
  }

  setColor(koef: number) {

    if(koef < 0.25){
      this. colorClass = colors.red
      return
    }
    if(koef < 0.65){
      this. colorClass = colors.orange
      return
    }
    if(koef < 1){
      this. colorClass = colors.green
      return
    }
  }

}
