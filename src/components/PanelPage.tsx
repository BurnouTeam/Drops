import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { Dispatch, SetStateAction, useState } from "react";
import Header from "./Header";
import Dashboard from './Dashboard';
import ProductPanel from './ProductPanel.tsx';
import ClientPanel from './ClientPanel.tsx';
import WhatsAppPanel from './WhatsAppPanel.tsx';
import ConfigurationPanel from './ConfigurationPanel.tsx';

const PanelPage = () => {

  const menu = useSelector( (state: RootState) => state.app.menu );

  const renderMainContent = () => {
    switch (menu) {
      case "dashboard":
        return <Dashboard/>
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
      <Header />
      <main className="flex-grow p-8 bg-[#FAFAFA]">
        {renderMainContent()}
      </main>
    </div>
  );
};

export default PanelPage;
