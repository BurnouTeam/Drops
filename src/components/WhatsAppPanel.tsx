import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMenu, setChatId } from "../redux/appSlice";
import { AppDispatch, RootState } from '../redux/store';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUserCircle, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import api, { botApi } from "../utils/api";
import QRCodeComponent from "./QRCodeComponent";
import { useWebSocket } from "../hooks/useWebSocket";

type Chat = {
  client: Client,
  messages: Messages[]
}

type ChatLastInteraction = {
  chatId:string,
  clientId:string,
  clientName:string,
  clientNumber:string,
  clientProfilePhoto:string,
  content:string,
  sentAt:string,
  fromMe:boolean,
  status:string,
  mediaType:string,
  messageType:string,
}

type Messages = {
  id:number,
  whatsappMessageId:string,
  content:string,
  sentAt:Date,
  fromMe:boolean,
  status:string,
  mediaUrl:string,
  mediaType:string,
  messageType:string,
  chatId:string,
  clientId:string,
  client:Client,
}

interface SidebarProps {
  chatCards: ChatLastInteraction[];
}

const Sidebar: React.FC<SidebarProps> = ({ chatCards }) =>{

  const chatId = useSelector((state: RootState) => state.app.chatId);
  const dispatch: AppDispatch = useDispatch();


  return (
  <div className="w-1/4 bg-gray-100 h-full flex flex-col overflow-hidden">
    <div className="flex border-b border-r items-center px-4 py-[10px] bg-white">
      <input
        type="text"
        placeholder="Procure uma conversa."
        className="flex-grow bg-gray-100 px-2 py-1 text-sm rounded focus:outline-none"
      />
      <FontAwesomeIcon icon={faSearch} className="text-gray-600 ml-2" />
    </div>
    <div className="overflow-y-auto overflow-x-hidden bg-white border-r border-gray-300 w-full h-full">
      {chatCards?.map((chat, index) => {

        return (
        <button onClick={() => {dispatch(setChatId(chat.clientId));}} key={chat.clientId} className={`w-full border-b border-gray-300 hover:bg-gray-200 cursor-pointer ${chat.clientId === chatId? "bg-blue-100" : ""}`} >
          <div className="w-full p-2">
            <div className={`flex items-center `}>
              <FontAwesomeIcon icon={faUserCircle} className="text-3xl text-gray-600 mr-3" />
              <div className="flex flex-col justify-items-start min-w-0 truncate">
                <div className="w-full text-left font-semibold truncate">{chat.clientName} <span className="font-light">{chat.clientId}</span></div>
                <div className="w-full text-left text-sm text-gray-500 truncate min-w-0 ">
                  {chat.content}
                </div>
              </div>
            </div>
          </div>
        </button>
      )})}
    </div>
  </div>
)};

const WhatsAppPanel: React.FC = () => {
  const [ isSessionActive, setIsSessionActive ] = useState(true);

  const chatId = useSelector((state: RootState) => state.app.chatId);
  const [ currentChatMessages, setCurrentChatMessages ] = useState<Chat>(null);
  const [ chats, setChats ] = useState<ChatLastInteraction[]>(null);
  const [ orgId, setOrgId ] = useState(2);
  const [ input, setInput ] = useState("");
  const { sendEvent, socket, botSocket } = useWebSocket();

  const handleSend = () => {
    if ( input.trim() !== ""  ) {
      const msg = { content: input, chatId: chatId, sentAt: new Date() }
      sendEvent('bot', 'send-message', msg);
      setCurrentChatMessages( (prev) => {
        return {
          ...prev,
          messages: [...prev.messages, msg ]
        }
      } )
      setInput("");
    }
  }


  const fetchChats = async (): Promise<void> => {
    try {
      const response = await api.get(`/org/${orgId}/chat/lastChats`);
      if ( response.status === 200 ) {
        setChats(response.data);
      }

    } catch ( error ) {
      console.error('Failed to fetch orders:', error);
    }
  }

  const fetchCurrentChat = async (clientId: string): Promise<void> => {
    try {
      const response = await api.get(`/org/${orgId}/chat/${clientId}/messages`);
      if ( response.status === 200 ) {
        let data = response.data;
        data.messages = data.messages.reverse();

        setCurrentChatMessages(data);
      }

    } catch (error){
      console.error('Failed to fetch orders:', error);
    }
  }

  useEffect( () => {
    fetchChats();
  }, [] )

  useEffect( () => {
    if (!botSocket) return;

    const handleNewMessage = (data: any) => {
      setCurrentChatMessages( (prev) => {
        return {
          ...prev,
          messages: [...prev.messages, {content:data} ]
        }
      } )
    };
    if (!botSocket.hasListeners('new-message')){
      botSocket.on('new-message', handleNewMessage)
    }
    return () => {
        botSocket.off('new-message');
    };
  }, [botSocket] )

  useEffect( () => {
    fetchCurrentChat(chatId);
  }, [chatId] )

  // TODO: WAY OF GET THE MESSAGES
  // useEffect( () => {
  //   const handleRecieve = (data: any) => {
  //       setCurrentChatMessages( (prev) => {
  //         return {
  //           ...prev,
  //           messages: [...prev.messages, data ]
  //         }
  //       })
  //   }
  //   botSocket.on('new-message', handleRecieve)
  //
  //   return () => {
  //     botSocket.off('new-message', handleRecieve);
  //   };
  // }, [] )

  useEffect(() => {
      // Check if session is active
      const checkSession = async () => {
          try {
              const response = await botApi.get('/wweb/session');
              setIsSessionActive(response.data.isSessionActive);
              console.log("Pegando a sessão: ", response.data.isSessionActive)
              if (!response.data.isSessionActive){
                sendEvent('bot','request-qr');
              }
          } catch (error) {
              console.error('Failed to check session:', error);
          }
      };

      checkSession();
  }, [] )

  if (chatId === 'Teste' )
    return (
      <div className="flex items-center w-full h-full bg-green-50 text-gray-500 border border-gray-300">
        <Sidebar chatCards={chats} />
        <div className="w-full h-full flex flex-col">
          <div className="flex items-center justify-center w-full h-full bg-white-50 text-gray-500">
            <p>Selecione uma conversa para ver as mensagens.</p>
          </div>
        </div>
      </div>
    );


  return (
    <div className="w-full  h-full flex flex-row border border-gray-300">
          {!isSessionActive ? (
          <div className="w-full flex">
            <Sidebar chatCards={chats} />
            <div className="w-full h-full flex flex-col">
              <div className="flex items-center px-4 py-[9.5px] bg-secondary border-b border-gray-300">
                <FontAwesomeIcon icon={faUserCircle} className="text-3xl text-white mr-3" />
                <div>
                  <div className="font-semibold text-white">{currentChatMessages?.client?.name}</div>
                </div>
              </div>
              <div className="flex-grow overflow-y-auto p-4 bg-white">
                {currentChatMessages?.messages?.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`mb-4 ${msg.fromMe ? "text-right mr-5" : "text-left ml-5"}`}
                  >
                    <div className={`inline-block px-3 py-2 rounded-lg ${msg.fromMe ? "bg-green-100 right-0" : "bg-gray-100"}`}>
                      {msg.content}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{new Date(msg.sentAt).toLocaleTimeString('pt-BR')}</div>
                  </div>
                ))}
              </div>
              <div className="flex items-center px-4 py-2 bg-white border-t">
                <input
                  type="text"
                  placeholder="Digite sua mensagem."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => { if (e.key === 'Enter') { handleSend() } }}
                  className="flex-grow bg-white px-3 py-2 rounded border border-gray-300 focus:outline-none"
                />
                <button onClick={() => { handleSend() }}className="ml-2 text-gray-500 hover:text-blue-800">
                  <FontAwesomeIcon icon={faPaperPlane} className="text-xl" />
                </button>
              </div>
            </div>
          </div>
          )
      : (<QRCodeComponent setSession={setIsSessionActive}/>)
    }
    </div>
  );
};

export default WhatsAppPanel;
