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
  
}

const Column: React.FC<OverviewProps> = ({ title, color }) => {

 
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
        
          <OverviewCard key={1} id={'1'} title={'Pedidos'} number={127}/>
          <OverviewCard key={2} id={'2'} title={'Novos clientes'} number={13}/>
          <OverviewCard key={3} id={'3'} title={'Faturamento do dia'} number={2651}/>

    
      </div>
    </div>
  );
};

export default Column;
