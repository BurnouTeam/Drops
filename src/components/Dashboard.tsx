import React, { Dispatch, SetStateAction, useState, useEffect, useRef } from 'react';
import { orders as mockedOrders } from '../data/orders';
import Column from './Column';
import OrdersOverview from './OrdersOverview';
import api from '../utils/api';
import { io } from 'socket.io-client';
import { useWebSocket } from '../hooks/useWebSocket';


interface DashboardProps {
}

const Dashboard: React.FC<DashboardProps> =  () => {
  const [ orders, setOrders ] = useState<OrderContainer>(mockedOrders);
  const { socket, on, off } = useWebSocket();
  // Add refs for all columns
  const pendingRef = useRef<HTMLDivElement | null>(null);
  const shippedRef = useRef<HTMLDivElement | null>(null);
  const completedRef = useRef<HTMLDivElement | null>(null);
  const recusedRef = useRef<HTMLDivElement | null>(null);

  const columnRefs = {
    pending: pendingRef,
    shipped: shippedRef,
    completed: completedRef,
    recused: recusedRef,
  };

  const fetchOrders = async (): Promise<void> => {
    try {
      const response = await api.get("/order/2");
      if ( response.status === 200 ) {
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
          order[0].status = 'shipped';
          break;
        case 'completed':
          order = updatedOrders.shipped.splice(at, 1);
          order[0].status = 'completed';
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

      order[0].status = 'recused';
      updatedOrders.recused.push(order[0]);

      return updatedOrders;
    });

  }

  useEffect( () => {
    fetchOrders();
  }, [] )

  useEffect( () => {
    const handleDataUpdate = (data: any) => {
      if (data?.data?.status === 'pending') {
        setOrders((prev) => ({
          ...prev,
          pending: [data.data, ...prev.pending],
        }));
      }
    };

    socket.on('dataUpdate', handleDataUpdate);

    return () => {
      socket.off('dataUpdate', handleDataUpdate);
    };
  }, [on, off] )


  return (
      <div className="px-8">
        <div className="flex-col">
          <div className="mb-12">
          <OrdersOverview  title="Resumo"/>
          </div>
          <div className="overflow-x-auto">
            <div className="flex justify-between min-w-max min-h-96">
              <Column ref={pendingRef} columnRefs={columnRefs} title="Pedidos Pendentes" color="#4d8bea" orders={orders.pending} kind="pending" handleEvolution={handleEvolveOrder} handleDelete={handleCancelOrder} />
              <Column ref={shippedRef} columnRefs={columnRefs} title="Pedidos Enviados" color="#f99236" orders={orders.shipped} kind="shipped" handleEvolution={handleEvolveOrder} handleDelete={handleCancelOrder} />
              <Column ref={completedRef} columnRefs={columnRefs} title="Pedidos Concluídos" color="#14B891" orders={orders.completed} kind="completed" handleEvolution={handleEvolveOrder} handleDelete={()=>{}} />
              <Column ref={recusedRef} columnRefs={columnRefs} title="Pedidos Cancelados" color="#800000" orders={orders.recused} kind="recused" handleEvolution={handleEvolveOrder} handleDelete={()=>{}}/>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Dashboard;
