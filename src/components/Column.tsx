import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHourglass,
  faCheck,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons'

import Card from './Card';

interface ColumnProps {
  title: string;
  color: string;
  kind: string;
  orders: Order[];
  handleEvolution: (at: number, to: string, from: string) => void;
  handleDelete: (at: number, from: string) => void;
  handleMessage: (id: number) => void;
}

const Column: React.FC<ColumnProps> = ({ title, color, orders, kind, handleEvolution, handleDelete, handleMessage }) => {

  const handleEvolveAction = (id: number, from: string) => {
    const type = kind === 'pending'? 'shipped' : 'completed';
    handleEvolution(id, type, from);
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
      className={`p-8 min-w-96 rounded-3xl flex flex-col self-stretch`}
      style={{ backgroundColor: `${color}20` }}
    >
      <div className={`flex flex-row place-content-between border-b mb-4`}>
        <h2 className={`text-xl font-bold mb-8 text-black`}>{getKindIcon(kind)} {title}</h2>
        <div
          className='flex justify-center items-center h-[38px] w-[38px] rounded-full'
          style={{ backgroundColor: `${color}` }}
        >
          <h6
            className={`text-xl text-center  font-bold text-white`}
          >{orders.length}</h6>
        </div>
      </div>
      <div
        className={'overflow-y-auto max-h-[700px]'}
        style={{ maxHeight: 'calc(100vh - 275px)' }}
      >
        {orders.map((order, index) => (
          <Card
            key={order.id}
            orderId={order.id}
            items={order.items}
            customer={order.client}
            status={order.status}
            updatedAt={order.createdAt}
            totalPrice={order.totalPrice}
            onEvolve={() => handleEvolveAction(index, order.status)}
            onDelete={() => handleDeleteAction(index)} onMessage={() => handleSendMessageAction(index)}
            />
        ))}
      </div>
    </div>
  );
};

export default Column;
