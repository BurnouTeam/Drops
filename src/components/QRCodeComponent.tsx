import { useEffect, useState } from 'react';
import { QRCodeSVG as QRCode } from 'qrcode.react'
import axios from 'axios';
import io from 'socket.io-client';

// Socket connection
const socket = io('http://localhost:3001', {
    transports: ['websocket']
});

const QRCodeComponent = () => {

  const [isSessionActive, setIsSessionActive] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
      // Check if session is active
      const checkSession = async () => {
          try {
              const response = await axios.get('http://localhost:3001/wweb/session');
              setIsSessionActive(response.data.isSessionActive);
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
          setStatus('Scan the QR Code');
          console.log("QR:", qr)
      });

      socket.on('ready', () => {
          setIsSessionActive(true);
          console.log("READY")
      });

      socket.on('authenticated', () => {
        setStatus('WhatsApp Connected');
        setQrCode(null);
        console.log("AUTHENTICATED")
      });

      socket.on('disconnected', () => {
        setStatus('Disconnected. Refresh to reconnect.');
        setQrCode(null);
        console.log("DISCONNECTED")
      });

      socket.on('message', (message) => {
        console.log(message)
      });

    return () => {
      socket.off('qr');
      socket.off('ready');
      socket.off('authenticated');
      socket.off('disconnected');
    };
  }, []);

  const handleDisconnect = () => {
    socket.emit('disconnect-wpp');
  };

  return (
      <div className="w-full justify-center items-center place-items-center">
          {isSessionActive ? (
              <div>
                <h1>Chat Window</h1>
                  <button
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                    onClick={handleDisconnect}
                  >
                    Disconnect
                  </button>
              </div>
              // Your chat component goes here
          ) : (
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
          )}
      </div>
  );
};

export default QRCodeComponent;

