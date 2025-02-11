import { useState, useEffect } from 'react';
import { websocketService } from '../services/websocketService';

export function useWebSocket() {
  const [socket, setSocket] = useState(websocketService.getSocket());

  useEffect(() => {
    const handleOpen = () => {
      console.log('WebSocket connected');
      setSocket(websocketService.getSocket());
    };

    const handleClose = () => {
      console.log('WebSocket disconnected');
      setSocket(null);
    };

    websocketService.getSocket().on('open', handleOpen);
    websocketService.getSocket().on('close', handleClose);

    return () => {
      websocketService.getSocket().off('open', handleOpen);
      websocketService.getSocket().off('close', handleClose);
    };
  }, []);

  return {
    socket: websocketService.getSocket(),
  };
}
