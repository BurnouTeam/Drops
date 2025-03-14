import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence } from 'framer-motion';
import {
  faHourglass,
  faCheck,
  faPaperPlane,
  faBan,
} from '@fortawesome/free-solid-svg-icons'

import Card from './Card';

interface ColumnProps {
  title: string;
  color: string;
  kind: string;
  orders: Order[];
  columnRefs: {
    pending: React.RefObject<HTMLDivElement>,
    shipped: React.RefObject<HTMLDivElement>,
    completed: React.RefObject<HTMLDivElement>,
    recused: React.RefObject<HTMLDivElement>,
  }
  revert?: boolean;
  handleEvolution: (at: number, to: string, from: string) => void;
  handleDelete: (at: number, from: string) => void;
  handleMessage: (id: number) => void;
}

const Column: React.FC<ColumnProps> = ({ title, color, orders, kind, columnRefs, revert, handleEvolution, handleDelete, handleMessage }) => {

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
    if (kind === 'recused') {
      return <FontAwesomeIcon icon={faBan} />
    }
  }

  const getColumnRef = (kind: string) => {
    if (kind === 'pending') {
      return [columnRefs['shipped'], columnRefs['recused']]
    }
    if (kind === 'shipped') {
      return [columnRefs['completed'], columnRefs['recused']]
    }
    else {
      return []
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
      <AnimatePresence>
        <div
          className={'overflow-y-auto overflow-x-hidden max-h-[700px]'}
          style={{ maxHeight: 'calc(100vh - 275px)' }}
        >
          {orders.map((order, index) => (
            <Card
              key={order.id}
              orderId={order.id}
              items={order.items}
              customer={order.client}
              status={order.status}
              payment={order.paymentMethod}
              default={order.default}
              updatedAt={order.createdAt}
              totalPrice={order.totalPrice}
              targetColumnRefs={[getColumnRef(kind), columnRefs['recused']]}
              onEvolve={() => handleEvolveAction(index, order.status)}
              onDelete={() => handleDeleteAction(index)} onMessage={() => handleSendMessageAction(index)}
              />
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default Column;
