import { Component, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-main-box',
  templateUrl: './main-box.component.html',
  styleUrls: ['./main-box.component.scss'],
  providers: [WebsocketService]
})
export class MainBoxComponent implements OnInit {

  endTime: number = 0;
  interval: number = 25000;
  isPaused: boolean = false;

  timerSub: Subscription;
  timeLeft: number;

  pauseTime: number;
  constructor(private websocketService: WebsocketService) {}

  ngOnInit(): void {
    this.timerSub = timer(0, 1000).subscribe(() => {
      if (!this.isPaused) this.updateTimeLeft()
    });
  }

  ngOnDestroy(): void{
    this.timerSub.unsubscribe();
    this.timerSub = null;
  }

  startTimer(){
    // if(this.isPaused){
    //   this.endTime += Date.now() - this.pauseTime;
    //   this.isPaused = false;
    // }else{
    //   this.endTime = Date.now() + this.interval;
    // }
    this.websocketService.startTimer()
  }

  stopTimer(){
    if (!this.isPaused && this.endTime - Date.now() >= 0){
      this.isPaused = true;
      this.pauseTime = Date.now();
    }
  }

  updateTimeLeft(){
    const temp: number = Math.round((this.endTime - Date.now())/1000);

    this.timeLeft = (temp <= 0) ? 25 : temp; 
  }

}
