import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { map, catchError } from 'rxjs/operators';
import * as socketIo from 'socket.io-client';
import { Socket } from './interfaces';

declare var io : {
  connect(url: string): Socket;
};

@Injectable()
export class DataService {

  socket: Socket=socketIo('http://localhost:3000');
  observer: Observer<any>;

  getQuotes() : Observable<any> 
  {
    this.socket.on('Available devices', (res) => {
      console.log(res);
      this.observer.next(res);
    });

    return new Observable(observer => {
      this.observer = observer;
    });
  }
}