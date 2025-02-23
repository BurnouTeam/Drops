import { EventEmitter } from "events";
import { io, Socket } from 'socket.io-client';

class WebSocketService extends EventEmitter {
  private static instance: WebSocketService;
  private socket: Socket;
  private botSocket: Socket;

  private constructor() {
    super();
    this.socket = io("ws://localhost:3000", {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 10000,
      reconnectionDelayMax: 30000,
    });
    if (!this.botSocket) {
      this.botSocket = io("ws://localhost:3001", {
        transports: ['websocket'],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 10000,
        reconnectionDelayMax: 30000,
      });
    }
  }

  public static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  public getSocket(which: string = 'bot'): Socket | null {
    if (which === 'back') {
      return this.socket;
    } else if (which === 'bot') {
      return this.botSocket;
    }
    return null;
  }

  public sendMessage(which: 'bot' | 'back' = 'bot' , event: string, msg?: any) {
    const targetSocket = which === "bot" ? this.botSocket : this.socket;
    if ( targetSocket ){
      targetSocket.emit(event,msg)
    }
  }
}

export const websocketService = WebSocketService.getInstance();
