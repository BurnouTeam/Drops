import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { orders as mockedOrders } from '../data/orders';
import Column from './Column';
import OrdersOverview from './OrdersOverview'
import api from '../utils/api';


interface DashboardProps {
  onChangeTab: Dispatch<SetStateAction<string>>
}

const Dashboard: React.FC<DashboardProps> =  ({ onChangeTab }) => {
  const [ orders, setOrders ] = useState<OrderContainer>(mockedOrders);

  const fetchOrders = async (): Promise<void> => {
    try {
      const response = await api.get("/order/2");
      if ( response.status === 200 ) {
        console.log(response.data)
        setOrders(response.data);
      }
    } catch ( error ) {
      console.error('Failed to fetch orders:', error);
    }
  }

  const changeOrder = async (item: Order, changeType: string): Promise<void> => {
    try {
      const response = await api.patch(`/order/${changeType}/${item.id}`, {
        organizationId: item.organizationId,
        status: item.status,
      });
      if ( response.status === 200 ) {
        console.log(response.data)
      }

    } catch ( error ) {
      console.error('Failed to changin orders:', error);
    }
  }

  const handleEvolveOrder = (at: number, to: string, from: string): void => {
    const selectedColumn: Order[] = orders[from];
    const selectedOrder: Order = selectedColumn[at]
    changeOrder(selectedOrder, 'next');
    setOrders((prev) => {
      // This way we do not mutate the original array when
      // using splice
      const updatedOrders = {
        pending: [...prev.pending],
        shipped: [...prev.shipped],
        completed: [...prev.completed],
        recused: [...prev.recused],
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

  const handleCancelOrder = (at: number, from: string): void => {
    const selectedColumn: Order[] = orders[from];
    const selectedOrder: Order = selectedColumn[at]
    changeOrder(selectedOrder, 'cancel');

    setOrders((prev) => {
      const updatedOrders = {
        pending: [...prev.pending],
        shipped: [...prev.shipped],
        completed: [...prev.completed],
        recused: [...prev.recused],
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

      updatedOrders.recused.push(order[0]);

      return updatedOrders;
    });

  }

  useEffect( () => {
    fetchOrders();
  }, [] )


  return (
      <div className="px-8">
          <OrdersOverview title="Resumo de pedidos" color="#ffffff" />

        {/* TODO: Make it all the height available instead of the size of the cards */}
        <div className="grid grid-cols-3 grid-rows-1 grid-flow-col auto-cols-auto gap-4 overflow-x-scroll">
          <Column title="Pedidos Pendentes" color="#4d8bea" orders={orders.pending} kind="pending" handleEvolution={handleEvolveOrder} handleDelete={handleCancelOrder} handleMessage={(id: number) => { onChangeTab('mensagens') }}/>
          <Column title="Pedidos Enviados" color="#f99236" orders={orders.shipped} kind="shipped" handleEvolution={handleEvolveOrder} handleDelete={handleCancelOrder} handleMessage={(id: number) => { onChangeTab('mensagens') }}/>
          <Column title="Pedidos Concluídos" color="#14B891" orders={orders.completed} kind="completed" handleEvolution={handleEvolveOrder} handleDelete={()=>{}} handleMessage={(id: number) => { onChangeTab('mensagens') }}/>
          <Column title="Pedidos Cancelados" color="#800000" orders={orders.recused} kind="completed" handleEvolution={handleEvolveOrder} handleDelete={()=>{}} handleMessage={(id: number) => { onChangeTab('mensagens') }}/>
        </div>
      </div>
  );
};

export default Dashboard;
