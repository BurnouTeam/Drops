import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTableColumns,
  faComments,
  faCartShopping,
  faPerson,
  faGear,
  faSearch,
  faBell,
  faSignOutAlt,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Dashboard from './Dashboard';
import ProductPanel from './ProductPanel.tsx';
import ClientPanel from './ClientPanel.tsx';
import WhatsAppPanel from './WhatsAppPanel.tsx';
import { Drops } from '../assets/drops.jsx'


const Header: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  const onLogOff = () => {
    localStorage.setItem("isAuthenticated", "false");
    navigate("/");
  }

  // Tab content mapping
  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />
      case "mensagens":
        return <WhatsAppPanel/>
      case "configuracoes":
        return <div>Adjust your configurations here.</div>;
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
      {/* Header Section */}
      <header className="bg-white w-full py-4 px-8 shadow-md">
        <div className="flex items-center justify-between">
          {/* Breadcrumb */}
          <div className="text-blue-900 text-sm">
            <Drops className="fill-secondary"/>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center space-x-8">
            <button
              className={`${
                activeTab === "dashboard" ? "bg-primary_light text-secondary font-bold" : "text-secondary"
              } font-semibold flex items-center space-x-2 px-4 py-1.5 rounded-lg hover:text-blue-700`}
              onClick={() => setActiveTab("dashboard")}
            >
              <FontAwesomeIcon icon={faTableColumns} />
              <span>Dashboard</span>
            </button>
            <button
              className={`${
                activeTab === "mensagens" ? "bg-primary_light text-secondary font-bold" : "text-secondary"
              } font-semibold flex items-center space-x-2 px-4 py-1.5 rounded-lg hover:text-blue-700`}
              onClick={() => setActiveTab("mensagens")}
            >
              <FontAwesomeIcon icon={faComments} />
              <span>Mensagens</span>
            </button>
            <button
              className={`${
                activeTab === "produtos" ? "bg-primary_light text-secondary font-bold" : "text-secondary"
              } font-semibold flex items-center space-x-2 px-4 py-1.5 rounded-lg hover:text-blue-700`}
              onClick={() => setActiveTab("produtos")}
            >
              <FontAwesomeIcon icon={faCartShopping} />
              <span>Produtos</span>
            </button>
            <button
              className={`${
                activeTab === "clientes" ? "bg-primary_light text-secondary font-bold" : "text-secondary"
              } font-semibold flex items-center space-x-2 px-4 py-1.5 rounded-lg  rounded-md hover:text-blue-700`}
              onClick={() => setActiveTab("clientes")}
            >
              <FontAwesomeIcon icon={faPerson} />
              <span>Clientes</span>
            </button>
            <button
              className={`${
                activeTab === "configuracoes" ? "bg-primary_light text-secondary font-bold" : "text-secondary"
              } font-semibold flex items-center space-x-2 px-4 py-1.5 rounded-lg hover:text-blue-700`}
              onClick={() => setActiveTab("configuracoes")}
            >
              <FontAwesomeIcon icon={faGear} />
              <span>Configurações</span>
            </button>
          </nav>

          {/* Profile and Actions */}
          <div className="flex items-center space-x-6">
            <FontAwesomeIcon
              icon={faSearch}
              className="text-secondary hover:text-gray-500 cursor-pointer"
            />
            <FontAwesomeIcon
              icon={faBell}
              className="text-secondary hover:text-gray-500 cursor-pointer"
            />
            <div className="flex items-center space-x-2">
              <img
                src="https://www.xsgames.co/randomusers/avatar.php?g=male"
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-secondary font-medium">Paulo César</span>
            </div>
            <button onClick={onLogOff}>
              <FontAwesomeIcon
                icon={faSignOutAlt}
                className="text-secondary hover:text-gray-500 cursor-pointer"
              />
            </button>
          </div>
        </div>
      </header>

      {/* Tab Content Section */}
        <main className="flex-grow p-8 bg-[#FAFAFA]">
          {renderTabContent()}
        </main>
    </div>
  );
};

export default Header;
