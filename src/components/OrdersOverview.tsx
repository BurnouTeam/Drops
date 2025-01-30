import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHourglass,
  faCheck,
  faPaperPlane,
  faChartBar,
} from '@fortawesome/free-solid-svg-icons'

import Card from './Card';
import OverviewCard from './OverviewCard'

interface OverviewProps {
  title: string;
  color: string;
  kind: string;
  orders: Order[];
  handleEvolution: (at: number, to: string) => void;
  handleDelete: (at: number, from: string) => void;
  handleMessage: (id: number) => void;
}

const Column: React.FC<OverviewProps> = ({ title, color, orders, kind, handleEvolution, handleDelete, handleMessage }) => {

  const handleEvolveAction = (id: number) => {
    const type = kind === 'pending'? 'shipped' : 'completed';
    handleEvolution(id, type);
  };

  const handleDeleteAction = (id: number) => {
    handleDelete(id, kind);
  };

  const handleSendMessageAction = (id: number) => {
    handleMessage(id);
  };

  const getKindIcon = (kind: string) => {
    if (kind === 'pending') {
      return <FontAwesomeIcon icon={faHourglass} />
    }
    if (kind === 'shipped') {
      return <FontAwesomeIcon icon={faPaperPlane} />
    }
    if (kind === 'completed') {
      return <FontAwesomeIcon icon={faCheck} />
    }
  }
  return (
    <div
      className={`p-8 rounded-3xl flex flex-col self-stretch`}
      style={{ backgroundColor: `#ffffff` }}
    >
      <div className={`flex flex-row justify-start border-b mb-4`}>
        <h2 className={`text-xl font-bold mb-2 text-black`}>{<FontAwesomeIcon icon={faChartBar} />} {title}</h2>
        <button className="px-4 py-0 ml-4 rounded-full border-2 border-indigo-200 text-custom-blue hover:bg-custom-blue hover:text-white transition duration-300">
            Diário
        </button>
        <button className="px-4 py-0 ml-4 rounded-full border-2 border-indigo-200 text-custom-blue hover:bg-custom-blue hover:text-white transition duration-300">
            Mensal
        </button>
      </div>
      <div
        className={'overflow-y-auto max-h-[700px] flex space-x-4'}
        style={{ maxHeight: 'calc(100vh - 275px)' }}
      >
        
          <OverviewCard key={1} title={'Pedidos'} number={127} onEvolve={() => handleEvolveAction(index)} onDelete={() => handleDeleteAction(index)} onMessage={() => handleSendMessageAction(index)}/>
          <OverviewCard key={2} title={'Novos clientes'} number={13} onEvolve={() => handleEvolveAction(index)} onDelete={() => handleDeleteAction(index)} onMessage={() => handleSendMessageAction(index)}/>
          <OverviewCard key={3} title={'Faturamento do dia'} number={2651} onEvolve={() => handleEvolveAction(index)} onDelete={() => handleDeleteAction(index)} onMessage={() => handleSendMessageAction(index)}/>

    
      </div>
    </div>
  );
};

export default Column;
