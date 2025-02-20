import { useEffect, useState } from 'react';
import { QRCodeSVG as QRCode } from 'qrcode.react'
import axios from 'axios';
import io from 'socket.io-client';
import { useWebSocket } from '../hooks/useWebSocket';

// Socket connection
// const socket = io('http://localhost:3001', {
//     transports: ['websocket'],
//     reconnection: true,
//     reconnectionAttempts: 5,
//     reconnectionDelay: 10000,
//     reconnectionDelayMax: 30000,
// });

interface QRCodeComponentProps {
  setSession: React.Dispatch<React.SetStateAction<boolean>>;
  data: string;
}

const QRCodeComponent: React.FC<QRCodeComponentProps> = ({ setSession, data }) => {

  const [qrCode, setQrCode] = useState('');
  const { socket } = useWebSocket();

  useEffect(() => {
      // Check if session is active
      const checkSession = async () => {
          try {
              const response = await axios.get('http://localhost:3001/wweb/session');
              setSession(response.data.isSessionActive);
              console.log("Pegando a sessão: ", response.data.isSessionActive)
              if (!response.data.isSessionActive){
                socket.emit('request-qr');
              }
          } catch (error) {
              console.error('Failed to check session:', error);
          }
      };

      checkSession();


      socket.on('qr', (qr) => {
          setQrCode(qr);
          console.log("QR:", qr)
      });

      socket.on('ready', () => {
          setSession(true);
          console.log("READY")
      });

      socket.on('authenticated', () => {
        setQrCode(null);
        setSession(true);
        console.log("AUTHENTICATED")
      });

      socket.on('disconnected', () => {
        setQrCode(null);
        console.log("DISCONNECTED")
      });

      socket.on('message', (message) => {
        console.log(message)
      });

      socket.on('new-message', (message) => {
        console.log(message)
      });

    return () => {
      socket.off('qr');
      socket.off('ready');
      socket.off('authenticated');
      socket.off('disconnected');
      socket.off('new-message');
    };
  }, []);

  const handleDisconnect = () => {
    socket.emit('disconnect-wpp');
  };

  return (
      <div className="w-full justify-center items-center place-items-center">
      {
        qrCode ? (
          <div className="flex h-full gap-y-10 flex-col items-center justify-center text-center w-full m-auto">
              <h1>Escaneie o QR Code para começar a usar o chat</h1>
              <QRCode width={300} height={300} value={qrCode} />
                  </div>
          ) : (
          <div className="flex gap-y-10 flex-col items-center justify-center text-center w-full m-auto">
            <h1>Loading...</h1>
          </div>
        )
      }
      </div>
  );
};

export default QRCodeComponent;

