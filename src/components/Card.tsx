import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPhone,
  faLocationDot,
  faClock,
  faTicket,
  faCheck,
  faBan,
  faCommentDots,
  faReceipt,
  faDollarSign,
} from "@fortawesome/free-solid-svg-icons";

interface OrderCardProps {
  orderId: string;
  quantity: number;
  product: string;
  customer: string;
  phone: string;
  address: string;
  price: string;
  payment: string;
  time: string;
}

const OrderCard: React.FC<OrderCardProps> = ({
  orderId,
  quantity,
  product,
  customer,
  phone,
  address,
  price,
  payment,
  time,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200 flex flex-col justify-between space-y-4 mb-4">
      {/* Order Header */}
      <div className="flex justify-between items-center">
        <span className="text-gray-500 text-sm flex items-center space-x-1">
          <FontAwesomeIcon icon={faTicket} />
          <span>#{orderId}</span>
        </span>
        <span className="text-gray-500 text-sm flex items-center space-x-1">
          <FontAwesomeIcon icon={faClock} />
          <span>{time}</span>
        </span>
      </div>

      {/* Product and Quantity */}
      <div className="flex flex-row place-content-between">
        <div className="">
          <div>
            <h2 className="text-lg text-black font-semibold mb-6">
              {quantity}x {product}
            </h2>
          </div>

          {/* Customer Details */}
          <div className="space-y-2.5">
            <p className="text-gray-700 flex items-center space-x-2">
              <FontAwesomeIcon icon={faUser} />
              <span>{customer}</span>
            </p>
            <p className="text-gray-700 flex items-center space-x-2">
              <FontAwesomeIcon icon={faPhone} />
              <span>{phone}</span>
            </p>
            <p className="text-gray-700 flex items-center space-x-2">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{address}</span>
            </p>
            <p className="text-gray-700 flex items-center gap-x-6">
              {/* Payment Details */}
              <span className="mr-4"><FontAwesomeIcon icon={faReceipt}/> {price}</span>
              <span><FontAwesomeIcon icon={faDollarSign}/> {payment}</span>
            </p>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex flex-col place-content-around space-y-2 w-1/12">
          <button className="hover:bg-orange-300 text-gray py-2 rounded-lg shadow-md flex items-center justify-center mt-2 space-x-2">
            <FontAwesomeIcon className="text-black" icon={faCheck} />
          </button>
          <button className="hover:bg-slate-200 text-gray py-2 rounded-lg shadow-md flex items-center justify-center space-x-2">
            <FontAwesomeIcon className="text-black" icon={faBan} />
          </button>
          <button className="hover:bg-emerald-400 text-gray py-2 rounded-lg shadow-md flex items-center justify-center space-x-2">
            <FontAwesomeIcon className="text-black" icon={faCommentDots} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
