import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket
  constructor() {
    this.socket = socketIo(environment.API_URI, { 'forceNew': true, autoConnect: false });

  }

  join(sessionID) {
    this.socket.connect()
    this.socket.emit('join', sessionID);
  }

  newMessageReceived() {
    let observable = new Observable<any>(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });
    return observable;
  }
  udpateMessageReceived() {
    let observable = new Observable<any>(observer => {
      this.socket.on('update-message', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });
    return observable;
  }
  
  leave() {
    console.log("disconnecting chat...")
    this.socket.removeAllListeners("message")
    this.socket.disconnect()
  }





}
