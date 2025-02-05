import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar } from '@fortawesome/free-solid-svg-icons';

import OverviewCard from './OverviewCard';
import ProgressBarCard from './ProgressBarCard';
import mockedProducts from '../data/products.ts';
import api from '../utils/api.ts';

interface OverviewProps {
  title: string;
}

const Overview: React.FC<OverviewProps> = ({ title }) => {

  const [isOpen, setIsOpen] = useState(true);
  const [timeFilter, setTimeFilter] = useState("day");
  const [ products, setProducts ] = useState<Product[]>(mockedProducts);

  const [ overviewData, setOverviewData ] = useState<any>({
    ordersCount: 0,
    clientsCount: 0,
    moneyMade: 0,
  });

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

  const fetchOverview = async (time: string = "day"): Promise<void> => {
    try {
      const response = await api.get(`/order/overview/${time}/2`);
      const responseClients = await api.get(`/client/overview/${time}/2`);
      let ordersCount: number = 0;
      let clientsCount: number = 0;
      let moneyMade: number = 0;

      if ( responseClients.status === 200 ) {
          clientsCount = responseClients.data.clientsCount
      }
      if ( response.status === 200 ) {
        ordersCount = response.data.ordersCount;
        moneyMade = response.data.completedSum
      }

      setOverviewData({
        ordersCount,
        clientsCount,
        moneyMade
      });

    } catch ( error ) {
      console.error('Failed to fetch orders:', error);
    }
  }

  useEffect( () => {
    fetchProducts();
  }, [] )

  useEffect( () => {
    fetchOverview();
  }, [timeFilter] )

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
        <div className="flex px-8">
          <div className="w-1/2 rounded-lg">
            <div className={`flex flex-row mb-4`}>
              <h2 className={`text-xl font-bold mb-2 text-black`}>{<FontAwesomeIcon icon={faChartBar} />} {title}</h2>
              <button onClick={() => setTimeFilter("day")} className={`px-4 py-0 ml-4 rounded-full border-2 ${timeFilter === "day"? "border-indigo-500": "border-indigo-200"} text-custom-blue hover:bg-custom-blue hover:text-white transition duration-300`}>
                  Diário
              </button>
              <button onClick={() => setTimeFilter("month")} className={`px-4 py-0 ml-4 rounded-full border-2 ${timeFilter === "month"? "border-indigo-500": "border-indigo-200"} text-custom-blue hover:bg-custom-blue hover:text-white transition duration-300`}>
                  Mensal
              </button>
            </div>
            <div
              className={'overflow-y-auto flex py-4 mr-12 justify-between'}
              // style={{ height: 'calc(100vh - 875px)' }}
            >
                <OverviewCard key={1} id={'1'} title={`Pedidos do ${timeFilter === "day"? "Dia": "Mês"}`} number={overviewData.ordersCount}/>
                <OverviewCard key={2} id={'2'} title={'Novos Clientes'} number={overviewData.clientsCount}/>
                <OverviewCard key={3} id={'3'} title={`Faturamento do ${timeFilter === "day"? "Dia": "Mês"}`} number={overviewData.moneyMade.toFixed(2)}/>
            </div>
          </div>
          <div className='w-1/2'>
            <ProgressBarCard data={products} orderBy="asc"/>
          </div>
        </div>
      )}
    </div>
  );
};

export default Overview;
