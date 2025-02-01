import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar } from '@fortawesome/free-solid-svg-icons';

import OverviewCard from './OverviewCard';
import ProgressBarCard from './ProgressBarCard';
import mockedProducts from '../data/products.ts';
import api from '../utils/api.ts';

interface OverviewProps {
  title: string;
  orders: Order[];
}

const Overview: React.FC<OverviewProps> = ({ title }) => {

  const [isOpen, setIsOpen] = useState(true);
  const [ products, setProducts ] = useState<Product[]>([]);

  const fetchProducts = async (): Promise<void> => {
    try {
      const response = await api.get("/product/2");
      if ( response.status === 200 ) {
        console.log(response.data)
        setProducts(response.data);
      }

    } catch ( error ) {
      console.error('Failed to fetch orders:', error);
    }
  }

  useEffect( () => {
    fetchProducts();
  }, [] )

  return (
    <div
      className={`p-4 rounded-3xl self-stretch border-2 `}
    >
      {/* Accordion Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center px-4 cursor-pointer"
      >
      {!isOpen?(<h2 className={`text-xl font-bold m-2 text-black`}>{<FontAwesomeIcon icon={faChartBar} />} {title}</h2>):<h2 className="mb-2"></h2>}
        <button>
          {isOpen ? (
            <span className="text-xl">&#9650;</span> // Up arrow
          ) : (
            <span className="text-xl">&#9660;</span> // Down arrow
          )}
        </button>
      </div>

      {isOpen && (
        <div className="flex justify-around px-8">
          <div className="w-1/2 rounded-lg">
            <div className={`flex flex-row justify-stretch  mb-4`}>
              <h2 className={`text-xl font-bold mb-2 text-black`}>{<FontAwesomeIcon icon={faChartBar} />} {title}</h2>
              <button className="px-4 py-0 ml-4 rounded-full border-2 border-indigo-200 text-custom-blue hover:bg-custom-blue hover:text-white transition duration-300">
                  Diário
              </button>
              <button className="px-4 py-0 ml-4 rounded-full border-2 border-indigo-200 text-custom-blue hover:bg-custom-blue hover:text-white transition duration-300">
                  Mensal
              </button>
            </div>
            <div
              className={'overflow-y-auto flex space-x-4 justify-start'}
              // style={{ height: 'calc(100vh - 875px)' }}
            >
                <OverviewCard key={1} id={'1'} title={'Pedidos do Dia'} number={127}/>
                <OverviewCard key={2} id={'2'} title={'Novos Clientes'} number={13}/>
                <OverviewCard key={3} id={'3'} title={'Faturamento do Dia'} number={2651}/>
            </div>
          </div>
          <ProgressBarCard data={products}/>
        </div>
      )}
    </div>
  );
};

export default Overview;
