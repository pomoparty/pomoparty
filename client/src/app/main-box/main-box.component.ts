import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-main-box',
  templateUrl: './main-box.component.html',
  styleUrls: ['./main-box.component.scss'],
  providers: [WebsocketService, ApiService],
})
export class MainBoxComponent implements OnInit {
  roomCode: string;
  newCode: string = '';
  timeLeft: number = 25000;
  started: boolean = false;
  paused: boolean = false;

  constructor(
    private websocketService: WebsocketService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.apiService.getCode().subscribe((code: string) => {
      this.roomCode = code;
      this.websocketService.joinRoom(code);
    });
    this.websocketService.startedStream.subscribe((started) => {
      this.started = started;
    });
    this.websocketService.pausedStream.subscribe((paused) => {
      this.paused = paused;
    });
    this.websocketService.updateTimerStream().subscribe((newTimeLeft) => {
      this.timeLeft = Math.max(newTimeLeft, 0);
    });
  }

  ngOnDestroy(): void {}

  startTimer() {
    this.websocketService.startTimer(this.timeLeft);
  }

  resetTimer() {
    this.timeLeft = 25000;
    if (this.started) {
      this.websocketService.stopTimer();
    }
  }

  pauseTimer() {
    this.websocketService.pauseTimer();
  }

  resumeTimer() {
    this.websocketService.resumeTimer();
  }

  secondsToMilliseconds(seconds: number) {
    return seconds / 1000;
  }

  keyUpEvent(value: string) {
    this.newCode = value;
  }

  handleRoomSubmit(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      event.preventDefault();
      if (this.roomCode != null && this.roomCode != '') {
        this.websocketService.leaveRoom(this.roomCode);
      }
      this.roomCode = this.newCode;
      this.websocketService.joinRoom(this.newCode);
    }
  }
}
