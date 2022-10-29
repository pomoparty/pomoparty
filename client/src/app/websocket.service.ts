import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, Subscriber } from 'rxjs';
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
  stopTimer() {
    this.socket.emit('stopTimer');
  }
  pauseTimer() {
    this.socket.emit('pauseTimer');
  }
  resumeTimer() {
    this.socket.emit('resumeTimer');
  }
  updateTimerStream() {
    return this.socket.fromEvent<number>('updateTimer');
  }
}
