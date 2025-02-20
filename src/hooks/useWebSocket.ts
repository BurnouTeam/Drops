import { useState, useEffect } from 'react';
import { websocketService } from '../services/websocketService';

export function useWebSocket() {
  const [socket, setSocket] = useState(websocketService.getSocket());
  const [botSocket, setBotSocket] = useState(websocketService.getSocket('bot'));

  useEffect(() => {
    const handleApiOpen = () => {
      console.log('WebSocket connected');
      setSocket(websocketService.getSocket());
    };

    const handleApiClose = () => {
      console.log('WebSocket disconnected');
      setSocket(null);
    };

    const handleApiMessage = (data: any) => {
      console.log('WebSocket disconnected');
    };

    const handleBotOpen = () => {
      console.log('WebSocket connected');
      setBotSocket(websocketService.getSocket('bot'));
    };

    const handleBotClose = () => {
      console.log('WebSocket disconnected');
      setSocket(null);
    };

    const handleBotMessage = (data: any) => {
      console.log('WebSocket disconnected');
    };

    socket.on('open', handleApiOpen);
    socket.on('close', handleApiClose);
    botSocket.on('open', handleBotOpen);
    botSocket.on('close', handleBotClose);

    return () => {
      socket.off('open', handleApiOpen);
      socket.off('close', handleApiClose);
      botSocket.off('open', handleBotOpen);
      botSocket.off('close', handleBotClose);
    };
  }, []);

  const sendEvent = (which: string, event: string, msg?: any) => {
    websocketService.sendMessage(which, event, msg)
  }

  return { socket, botSocket, sendEvent };
}
