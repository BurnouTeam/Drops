import React, { Dispatch, SetStateAction, useState } from 'react';
import { orders as mockedOrders } from '../data/orders';
import Column from './Column';
import OrdersOverview from './OrdersOverview'

interface DashboardProps {
  onChangeTab: Dispatch<SetStateAction<string>>
}

const Dashboard: React.FC<DashboardProps> =  ({ onChangeTab }) => {
  const [ orders, setOrders ] = useState<OrderContainer>(mockedOrders);

  const handleEvolveOrder = (at: number, to: string): void => {
    setOrders((prev) => {
      // This way we do not mutate the original array when
      // using splice
      const updatedOrders = {
        pending: [...prev.pending],
        shipped: [...prev.shipped],
        completed: [...prev.completed],
      };

      let order: Order[] = [];
      switch (to) {
        case 'shipped':
          order = updatedOrders.pending.splice(at, 1);
          break;
        case 'completed':
          order = updatedOrders.shipped.splice(at, 1);
          break;
        default:
          break;
      }

      if (order.length > 0) {
          updatedOrders[to] = [...updatedOrders[to], order[0]];
      }

      return updatedOrders;
    });
  }

  const handleDeleteOrder = (at: number, from: string): void => {
    setOrders((prev) => {
      const updatedOrders = {
        pending: [...prev.pending],
        shipped: [...prev.shipped],
        completed: [...prev.completed],
      };

      let order: Order[] = [];
      switch (from) {
        case 'pending':
          order = updatedOrders.pending.splice(at, 1);
          break;
        case 'shipped':
          order = updatedOrders.shipped.splice(at, 1);
          break;
        case 'completed':
          order = updatedOrders.completed.splice(at, 1);
          break;
        default:
          break;
      }

      return updatedOrders;
    });

  }


  return (
      <div className="px-8">
          <OrdersOverview title="Resumo de pedidos" color="#ffffff" orders={orders.pending} kind="pending" handleEvolution={handleEvolveOrder} handleDelete={handleDeleteOrder} handleMessage={(id: number) => { onChangeTab('mensagens') }}/>

        {/* TODO: Make it all the height available instead of the size of the cards */}
        <div className="grid grid-cols-3 grid-rows-1 grid-flow-col auto-cols-auto gap-4">
          <Column title="Pedidos Pendentes" color="#4d8bea" orders={orders.pending} kind="pending" handleEvolution={handleEvolveOrder} handleDelete={handleDeleteOrder} handleMessage={(id: number) => { onChangeTab('mensagens') }}/>
          <Column title="Pedidos Enviados" color="#f99236" orders={orders.shipped} kind="shipped" handleEvolution={handleEvolveOrder} handleDelete={()=>{}} handleMessage={(id: number) => { onChangeTab('mensagens') }}/>
          <Column title="Pedidos Concluídos" color="#14B891" orders={orders.completed} kind="completed" handleEvolution={handleEvolveOrder} handleDelete={()=>{}} handleMessage={(id: number) => { onChangeTab('mensagens') }}/>
        </div>
      </div>
  );
};

export default Dashboard;
