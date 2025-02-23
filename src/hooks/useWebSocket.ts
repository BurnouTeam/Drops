import { useState, useEffect } from 'react';
import { websocketService } from '../services/websocketService';

export function useWebSocket() {
  const [socket, setSocket] = useState(websocketService.getSocket('back'));
  const [botSocket, setBotSocket] = useState(websocketService.getSocket('bot'));

  useEffect(() => {
    if (!botSocket) return;
    if (!socket) return;
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
    };

    const handleBotClose = () => {
      console.log('WebSocket disconnected');
    };

    const handleBotMessage = (data: any) => {
      console.log('WebSocket disconnected');
    };

    if (!socket.hasListeners("open")) socket.on('open', handleApiOpen);
    if (!socket.hasListeners("close")) socket.on('close', handleApiClose);
    if (!botSocket.hasListeners("open")) botSocket.on('open', handleBotOpen);
    if (!botSocket.hasListeners("close")) botSocket.on('close', handleBotClose);

    return () => {
      socket.off('open', handleApiOpen);
      socket.off('close', handleApiClose);
      botSocket.off('open', handleBotOpen);
      botSocket.off('close', handleBotClose);
    };
  }, [botSocket]);

  const sendEvent = (which: 'bot' | 'back', event: string, msg?: any) => {
    websocketService.sendMessage(which, event, msg)
  }

  return { socket, botSocket, sendEvent };
}
