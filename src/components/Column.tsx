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
  orders: any[];
}

const Column: React.FC<ColumnProps> = ({ title, color, orders, kind }) => {
  const handleActionClick = (action: string) => {
    alert(`${action} clicked`);
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
    // Convert the alpha value into a valid rgba background color
  return (
    <div
      className={`p-8 rounded-3xl flex flex-col`}
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
        {orders.map((order) => (
          <Card key={order.orderId} {...order} onActionClick={handleActionClick} />
        ))}
      </div>
    </div>
  );
};

export default Column;
