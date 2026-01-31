import { effect, Injectable, signal } from '@angular/core';
import { ClientMessage, ServerMessage } from '../types';
import { Subject } from 'rxjs';

type ConnectionState = 'connected' | 'disconnected' | 'connecting';

@Injectable({
  providedIn: 'root',
})
export class WebSocketConnectionService {
  private socket: WebSocket | null = null;
  public connectionStatus = signal<ConnectionState>('connecting');
  public onMessage = new Subject<ServerMessage>();

  constructor() {
    this.connectWebSocket();
  }

  private reconnectInterval: number | null = null;

  private reconnectEffect = effect(() => {
    if (this.connectionStatus() === 'disconnected') {
      if (this.reconnectInterval) return;

      this.reconnectInterval = setInterval(() => {
        this.connectWebSocket();
      }, 1000);
    }

    if (this.connectionStatus() === 'connected') {
      clearInterval(this.reconnectInterval || 0);
      this.reconnectInterval = null;
    }
  });

  public connectWebSocket() {
    this.socket = new WebSocket('ws://localhost:3200');
    if (!this.socket) throw new Error('WebSocket initialization failed');

    this.socket.addEventListener('open', () => {
      this.connectionStatus.set('connected');
    });

    this.socket.addEventListener('close', () => {
      this.connectionStatus.set('disconnected');
    });

    this.socket.addEventListener('error', (event) => {
      console.error('WebSocket error occurred: ', event);
    });

    this.socket.addEventListener('message', (event) => {
      const data: ServerMessage = JSON.parse(event.data);
      this.onMessage.next(data);
    });
  }

  public sendMessage(message: ClientMessage) {
    if (!this.socket) throw new Error('WebSocket is not initialized');
    this.socket.send(JSON.stringify(message));
  }
}
