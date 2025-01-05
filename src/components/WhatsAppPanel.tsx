import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUserCircle, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import chatMessages from "../data/messages";

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

interface SidebarProps {
  handleClick: React.Dispatch<React.SetStateAction<number>>;
  selectedChat: number;
  chatMessages: ChatMessages[];
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
          <button onClick={() => {handleClick(index);console.log(index)}} key={chat.id} className="flex-grow" >
            <div className={`flex items-center px-2 py-3 hover:bg-gray-200 cursor-pointer border-b border-gray-300 ${chat.id - 1 === selectedChat? "bg-blue-100" : ""}`}>
              <FontAwesomeIcon icon={faUserCircle} className="text-3xl text-gray-600 mr-3" />
              <div className="flex flex-col justify-items-start">
                <div className="text-left font-semibold ">{chat.name} <span className="font-light ">{chat.phone}</span></div>
                <div className="text-left text-sm text-gray-500">
                  {chat.messages[chat.messages.length - 1].text}
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
  const [ chatId, setChatId ] = useState<number>(0);
  const chat = chatMessages[chatId];

  if (!chat)
    return (
      <div className="flex items-center w-full h-full bg-white-50 text-gray-500">
        <Sidebar handleClick={setChatId} chatMessages={chatMessages}/>
        <div className="flex items-center justify-center w-full h-full bg-white-50 text-gray-500">
          <p>Selecione uma conversa para ver as mensagens.</p>
        </div>
      </div>
    );


  return (
    <div className="w-full px-8 h-full flex flex-row">
      <Sidebar handleClick={setChatId} chatMessages={chatMessages} selectedChat={chatId}/>
      <div className="w-full h-full flex flex-col">
        <div className="flex items-center px-4 py-[9.5px] bg-secondary border-b border-gray-300">
          <FontAwesomeIcon icon={faUserCircle} className="text-3xl text-white mr-3" />
          <div>
            <div className="font-semibold text-white">{chat.name}</div>
          </div>
        </div>
        <div className="flex-grow overflow-y-auto p-4 bg-white">
          {chat.messages.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-4 ${msg.sender === "Drops" ? "text-right mr-5" : "text-left ml-5"}`}
            >
              <div className={`inline-block px-3 py-2 rounded-lg ${msg.sender === chat.name ? "bg-green-100 right-0" : "bg-gray-100"}`}>
                {msg.text}
              </div>
              <div className="text-xs text-gray-500 mt-1">{msg.timestamp}</div>
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
