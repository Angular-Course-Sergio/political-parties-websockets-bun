import { Injectable, signal } from '@angular/core';

type ConnectionState = 'connected' | 'disconnected' | 'connecting';

@Injectable({
  providedIn: 'root',
})
export class WebSocketConnectionService {
  private socket: WebSocket | null = null;
  public connectionStatus = signal<ConnectionState>('connecting');

  constructor() {
    this.connectWebSocket();
  }

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
      console.log('WebSocket message received: ', event.data);
    });
  }
}
