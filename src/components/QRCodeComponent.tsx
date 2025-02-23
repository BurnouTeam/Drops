import { useEffect, useState } from 'react';
import { QRCodeSVG as QRCode } from 'qrcode.react'
import axios from 'axios';
import io from 'socket.io-client';
import { useWebSocket } from '../hooks/useWebSocket';


interface QRCodeComponentProps {
  setSession: React.Dispatch<React.SetStateAction<boolean>>;
}

const QRCodeComponent: React.FC<QRCodeComponentProps> = ({ setSession }) => {

  const [qrCode, setQrCode] = useState('');
  const { botSocket } = useWebSocket();

  useEffect(() => {
      // Check if session is active
      const checkSession = async () => {
          try {
              const response = await axios.get('http://localhost:3001/wweb/session');
              setSession(response.data.isSessionActive);
              console.log("Pegando a sessão: ", response.data.isSessionActive)
              if (!response.data.isSessionActive){
                botSocket.emit('request-qr');
              }
          } catch (error) {
              console.error('Failed to check session:', error);
          }
      };

      checkSession();


      botSocket.on('qr', (qr) => {
          setQrCode(qr);
          console.log("QR:", qr)
      });

      botSocket.on('ready', () => {
          setSession(true);
          console.log("READY")
      });

      botSocket.on('authenticated', () => {
        setQrCode(null);
        setSession(true);
        console.log("AUTHENTICATED")
      });

      botSocket.on('disconnected', () => {
        setQrCode(null);
        console.log("DISCONNECTED")
      });

      botSocket.on('message', (message) => {
        console.log(message)
      });

      botSocket.on('new-message', (message) => {
        console.log(message)
      });

    return () => {
      botSocket.off('qr');
      botSocket.off('ready');
      botSocket.off('authenticated');
      botSocket.off('disconnected');
      botSocket.off('new-message');
    };
  }, []);

  const handleDisconnect = () => {
    botSocket.emit('disconnect-wpp');
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

