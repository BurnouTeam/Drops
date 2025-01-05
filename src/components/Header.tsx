import React, { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
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
} from '@fortawesome/free-solid-svg-icons';
import { RootState } from '../redux/store';
import { logout } from '../redux/userSlice.js';
import { Drops } from '../assets/drops.jsx'


interface HeaderProps {
  onChangeTab: Dispatch<SetStateAction<string>>
  selectedTab: string
}


const Header: React.FC<HeaderProps> = ({ onChangeTab, selectedTab }) => {
  const { user } = useSelector( (state: RootState) => state.user );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogOff = () => {
    dispatch(logout());
    localStorage.removeItem('persist:root');
    navigate("/login");
  }

  return (
    <div>
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
                selectedTab === "dashboard" ? "bg-primary_light text-secondary font-bold" : "text-secondary"
              } font-semibold flex items-center space-x-2 px-4 py-1.5 rounded-lg hover:text-blue-700`}
              onClick={() => onChangeTab("dashboard")}
            >
              <FontAwesomeIcon icon={faTableColumns} />
              <span>Dashboard</span>
            </button>
            <button
              className={`${
                selectedTab === "mensagens" ? "bg-primary_light text-secondary font-bold" : "text-secondary"
              } font-semibold flex items-center space-x-2 px-4 py-1.5 rounded-lg hover:text-blue-700`}
              onClick={() => onChangeTab("mensagens")}
            >
              <FontAwesomeIcon icon={faComments} />
              <span>Mensagens</span>
            </button>
            <button
              className={`${
                selectedTab === "produtos" ? "bg-primary_light text-secondary font-bold" : "text-secondary"
              } font-semibold flex items-center space-x-2 px-4 py-1.5 rounded-lg hover:text-blue-700`}
              onClick={() => onChangeTab("produtos")}
            >
              <FontAwesomeIcon icon={faCartShopping} />
              <span>Produtos</span>
            </button>
            <button
              className={`${
                selectedTab === "clientes" ? "bg-primary_light text-secondary font-bold" : "text-secondary"
              } font-semibold flex items-center space-x-2 px-4 py-1.5 rounded-lg  rounded-md hover:text-blue-700`}
              onClick={() => onChangeTab("clientes")}
            >
              <FontAwesomeIcon icon={faPerson} />
              <span>Clientes</span>
            </button>
            <button
              className={`${
                selectedTab === "configuracoes" ? "bg-primary_light text-secondary font-bold" : "text-secondary"
              } font-semibold flex items-center space-x-2 px-4 py-1.5 rounded-lg hover:text-blue-700`}
              onClick={() => onChangeTab("configuracoes")}
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
                src="profile-default.png"
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-secondary font-medium">{user?.name}</span>
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
        {/* <main className="flex-grow p-8 bg-[#FAFAFA]"> */}
        {/*   {renderTabContent()} */}
        {/* </main> */}
    </div>
  );
};

export default Header;
