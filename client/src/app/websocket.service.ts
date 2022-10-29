import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { combineLatest, map, max, Observable, Subscriber } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  pausedStream: Observable<boolean> = new Observable(
    (subscriber: Subscriber<boolean>) => {
      this.socket.on('resumeTimer', () => {
        subscriber.next(false);
      });
      this.socket.on('pauseTimer', () => {
        subscriber.next(true);
      });
    }
  );
  startedStream: Observable<boolean> = new Observable(
    (subscriber: Subscriber<boolean>) => {
      this.socket.on('startTimer', () => {
        subscriber.next(true);
      });
      this.socket.on('stopTimer', () => {
        subscriber.next(false);
      });
    }
  );
  updateTimerStream: Observable<number> = new Observable(
    (subscriber: Subscriber<number>) => {
      this.socket.on('updateTimer', (newTime) => {
        subscriber.next(newTime);
      });
      this.socket.on('startTimer', (newTime) => {
        subscriber.next(newTime);
      });
    }
  );
  constructor(private socket: Socket) {
    this.socket.on('startTimer', (payload: string) => {
      console.log(`Received: ${payload}`);
    });
  }

  joinRoom(roomCode: string) {
    this.socket.emit('joinRoom', roomCode);
  }
  leaveRoom(roomCode: string) {
    this.socket.emit('leaveRoom', roomCode);
  }

  startTimer(durationMillis: number) {
    this.socket.emit('startTimer', durationMillis);
  }
  stopTimer(durationMillis: number) {
    this.socket.emit('stopTimer', durationMillis);
  }
  pauseTimer() {
    this.socket.emit('pauseTimer');
  }
  resumeTimer() {
    this.socket.emit('resumeTimer');
  }
}
