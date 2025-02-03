import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUserCircle, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import chatMessages from "../data/messages";
import api from "../utils/api";

// TODO: Remove this two types, they should be global
type Message = {
  text: string,
  sender: string,
  timestamp: string,
  // TODO: Destination should be mandatory it is not for testing
  destination?: string,
}
type ChatMessages = {
  id: number,
  name: string,
  phone: string,
  address: string,
  messages: Message[]
}

type Chat = {
  clientName: string,
  messages: ChatMessages[]
}

type ChatMessagesModel = {
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
  handleClick: React.Dispatch<React.SetStateAction<number>>;
  selectedChat: number;
  chatMessages: ChatMessagesModel[];
}

const Sidebar: React.FC<SidebarProps> = ({ handleClick, selectedChat, chatMessages }) => (
  <div className="w-1/4 bg-gray-100 h-full flex flex-col">
    <div className="flex items-center px-4 py-[10px] border-b border-r border-gray-300 bg-white">
      <input
        type="text"
        placeholder="Procure uma conversa."
        className="flex-grow bg-gray-100 px-2 py-1 text-sm rounded focus:outline-none"
      />
      <FontAwesomeIcon icon={faSearch} className="text-gray-600 ml-2" />
    </div>
    <div className="overflow-y-auto overflow-x-hidden whitespace-nowrap bg-white h-full flex-grow border-r">
      {chatMessages.map((chat, index) => (
        <div className="flex flex-row">
          <button onClick={() => {handleClick(chat.id)}} key={chat.id} className="flex-grow" >
            <div className={`flex items-center px-2 py-3 hover:bg-gray-200 cursor-pointer border-b border-gray-300 ${chat.id - 1 === selectedChat? "bg-blue-100" : ""}`}>
              <FontAwesomeIcon icon={faUserCircle} className="text-3xl text-gray-600 mr-3" />
              <div className="flex flex-col justify-items-start">
                <div className="text-left font-semibold ">{chat.clientId} <span className="font-light ">{chat.clientId}</span></div>
                <div className="text-left text-sm text-gray-500">
                  {chatMessages[chatMessages.length - 1].content}
                </div>
              </div>
            </div>
          </button>
        </div>
      ))}
    </div>
  </div>
);

const WhatsAppPanel: React.FC = () => {
  // const chat2 = chatMessages[chatId];
  const [ currentChat, setCurrentChat ] = useState<Chat>({clientName:"Default",messages:[]});
  const [ messages, setMessages ] = useState<ChatMessagesModel[]>([]);
  const [ chats, setChats ] = useState<ChatMessagesModel>(null);
  const [ orgId, setOrgId ] = useState(2);

  const fetchChats = async (): Promise<void> => {
    try {
      const response = await api.get("/org/2/chat/+5585996105145");
      if ( response.status === 200 ) {
        console.log(response.data)
        setMessages(response.data);
      }

    } catch ( error ) {
      console.error('Failed to fetch orders:', error);
    }
  }

  const fetchCurrentChat = async (clientId: string): Promise<void> => {
    try {
      const response = await api.get(`/org/2/chat/${clientId}/messages`);
      if ( response.status === 200 ) {
        const responseClientData = await api.get(`/client/2/${clientId}`)
        if (responseClientData.status === 200) {
          const chat = {
            clientName: responseClientData.data.name,
            messages: response.data.reverse()
          }
          setCurrentChat(chat);
        }
      }

    } catch (error){
      console.error('Failed to fetch orders:', error);
    }
  }

  useEffect( () => {
    // fetchChats();
    fetchCurrentChat("+5585996105145");
  }, [] )

  if (!messages)
    return (
      <div className="flex items-center w-full h-full bg-white-50 text-gray-500">
        {/* <Sidebar handleClick={setCurrentChat} chatMessages={messages}/> */}
        <div className="flex items-center justify-center w-full h-full bg-white-50 text-gray-500">
          <p>Selecione uma conversa para ver as mensagens.</p>
        </div>
      </div>
    );


  return (
    <div className="w-full px-8 h-full flex flex-row">
      {/* <Sidebar handleClick={setCurrentChat} chatMessages={messages} selectedChat={currentChat}/> */}
      <div className="w-full h-full flex flex-col">
        <div className="flex items-center px-4 py-[9.5px] bg-secondary border-b border-gray-300">
          <FontAwesomeIcon icon={faUserCircle} className="text-3xl text-white mr-3" />
          <div>
            <div className="font-semibold text-white">{currentChat?.clientName}</div>
          </div>
        </div>
        <div className="flex-grow overflow-y-auto p-4 bg-white">
          {currentChat.messages?.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-4 ${msg.fromMe ? "text-right mr-5" : "text-left ml-5"}`}
            >
              <div className={`inline-block px-3 py-2 rounded-lg ${!msg.fromMe ? "bg-green-100 right-0" : "bg-gray-100"}`}>
                {msg.content}
              </div>
              <div className="text-xs text-gray-500 mt-1">{msg.sentAt.toString()}</div>
            </div>
          ))}
        </div>
        <div className="flex items-center px-4 py-2 bg-white border-t">
          <input
            type="text"
            placeholder="Digite sua mensagem."
            className="flex-grow bg-white px-3 py-2 rounded border border-gray-300 focus:outline-none"
          />
          <button className="ml-2 text-gray-500">
            <FontAwesomeIcon icon={faPaperPlane} className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppPanel;
