import { EventEmitter } from "events";
import { io, Socket } from 'socket.io-client';

class WebSocketService extends EventEmitter {
  private static instance: WebSocketService;
  private socket: Socket;

  private constructor() {
    super(); // Initialize EventEmitter
    this.socket = io("ws://localhost:3000");
  }

  public static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  public getSocket(): Socket {
    return this.socket;
  }

  public sendMessage(msg: string) {
    this.socket.send(msg);
  }
}

export const websocketService = WebSocketService.getInstance();
