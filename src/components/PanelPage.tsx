import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Dispatch, SetStateAction, useState } from "react";
import Header from "./Header";
import Dashboard from './Dashboard';
import ProductPanel from './ProductPanel.tsx';
import ClientPanel from './ClientPanel.tsx';
import WhatsAppPanel from './WhatsAppPanel.tsx';
import ConfigurationPanel from './ConfigurationPanel.tsx';

const PanelPage = () => {

  const [activeTab, setActiveTab] = useState("dashboard");

  const renderMainContent = (onChangeTab : Dispatch<SetStateAction<string>>) => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard onChangeTab={onChangeTab}/>
      case "mensagens":
        return <WhatsAppPanel/>
      case "configuracoes":
        return <ConfigurationPanel/>
      case "produtos":
        return <ProductPanel />
      case "clientes":
        return <ClientPanel />
      default:
        return <div>Crie seu painel aqui.</div>;
    }
  };


  return (
    <div className="flex flex-col h-screen">
      <Header onChangeTab={setActiveTab} selectedTab={activeTab}/>
      <main className="flex-grow p-8 bg-[#FAFAFA]">
        {renderMainContent(setActiveTab)}
      </main>
    </div>
  );
};

export default PanelPage;
