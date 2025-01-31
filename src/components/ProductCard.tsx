import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faPhone,
    faLocationDot,
    faClock,
    faTicket,
    faPaperPlane,
    faCheck,
    faBan,
    faCommentDots,
    faReceipt,
    faDollarSign,
    faEdit,
    faTrash
  } from "@fortawesome/free-solid-svg-icons";

interface OverviewCardProps {

    name: string;
    type: string;
    value: number;
    quantity: number;
    status: string;
}

const OrderCard: React.FC<OverviewCardProps> = ({
  name,
  type,
  value,
  quantity,
  status
}) => {

  return (
    <div className="aspect-w-1 aspect-h-1 bg-white rounded-2xl shadow-md p-4 py-1 border-2 border-indigo-200 flex flex-col justify-between space-y-4 mb-4">
  
  {/* Product and Quantity */}
  <div className="flex flex-col space-y-2">
    <div className="flex items-center space-x-2 mt-4 justify-between">
      <h2 className="text-3xl text-black font-semibold mb-2">{name}</h2>

      {/* Icons */}
      <div className="flex items-center space-x-2 mt-4">
        <span className="text-gray-500 text-sm flex items-center space-x-1">
            <FontAwesomeIcon icon={faEdit} />
        </span>
        <span className="text-gray-500 text-sm flex items-center space-x-1">
            <FontAwesomeIcon icon={faTrash} />
        </span>
      </div>
    </div>

    <div className="flex items-center space-x-2 mt-4 justify-between">
      <h2 className="text-lg">{type}</h2>
      <h2>R$ {value}</h2>
    </div>
    <div className="flex items-center space-x-2 mt-4 justify-between">
      <h2 className="text-lg">{quantity} und.</h2>
      <h2>{status}</h2>
    </div>
  </div>
  
</div>
  );
};

export default OrderCard;
