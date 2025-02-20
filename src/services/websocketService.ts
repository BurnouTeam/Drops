import { EventEmitter } from "events";
import { io, Socket } from 'socket.io-client';

class WebSocketService extends EventEmitter {
  private static instance: WebSocketService;
  private socket: Socket;
  private botSocket: Socket;

  private constructor() {
    super(); // Initialize EventEmitter
    this.socket = io("ws://localhost:3000", {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 10000,
      reconnectionDelayMax: 30000,
    });
    this.botSocket = io("ws://localhost:3001", {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 10000,
      reconnectionDelayMax: 30000,
    });
  }

  public static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  public getSocket(which: string = 'back'): Socket {
    if (which === 'back') {
      return this.socket;
    } else {
      return this.botSocket;
    }
  }

  public sendMessage(which: string = 'back', event: string, msg?: any) {
    if (which === 'back') {
      this.socket.emit(event, msg);
    } else {
      this.botSocket.emit(event, msg);
    }
  }
}

export const websocketService = WebSocketService.getInstance();
