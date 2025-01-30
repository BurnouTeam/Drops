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
} from "@fortawesome/free-solid-svg-icons";

interface OrderCardProps {
  orderId: string;
  quantity: number;
  product: string;
  customer: string;
  phone: string;
  address: string;
  price: number;
  payment: string;
  time: string;
  kind: string;
  onEvolve: () => void;
  onDelete: () => void;
  onMessage: () => void;
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
  kind,
  onEvolve,
  onDelete,
  onMessage,
}) => {

  const sendMessage = () => {
    const message = `Olá, seu pedido #${orderId} foi enviado!\nEstamos enviando ${quantity}x ${product} para ${address}.\n\nO valor total é de R$ ${price}.\n\nObrigado por comprar conosco!`;
    // const url = `https://api.whatsapp.com/send?phone=55${phone}&text=${message
    const url = `http://localhost:3001/enviar-mensagem`
    const splitted = phone.split(" ");
    const correctPhone = splitted[0].slice(1,3) + splitted[1] + (splitted[2].length === 9 ? splitted[2].slice(1,9) : splitted[2]);

    console.log(correctPhone);

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({numero:correctPhone, mensagem:message})
    })
  }
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
              <span className="mr-4"><FontAwesomeIcon icon={faReceipt}/> R$ {new Intl.NumberFormat('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(price)}</span>
              <span><FontAwesomeIcon icon={faDollarSign}/> {payment}</span>
            </p>
          </div>

        </div>

        {/* Action Buttons */}
        {
          kind==="pending" &&

          <div className="flex flex-col place-content-around space-y-2 w-1/12">
            <button onClick={() => {onEvolve(); sendMessage()}} className="relative group hover:bg-orange-300 text-gray py-2 rounded-lg shadow-md flex items-center justify-center mt-2 space-x-2">
              <FontAwesomeIcon className="text-black " icon={faPaperPlane} />
              <div className="absolute bottom-full left-1/4 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                Enviar pedido
              </div>
              
            </button>
            <button onClick={() => {onDelete()}} className="relative group hover:bg-slate-200 text-gray py-2 rounded-lg shadow-md flex items-center justify-center space-x-2">
              <FontAwesomeIcon className="text-black" icon={faBan} />
              <div className="absolute bottom-full left-1/4 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                Cancelar pedido
              </div>
            </button>
            <button onClick={() => {onMessage()}} className="relative group hover:bg-emerald-400 text-gray py-2 rounded-lg shadow-md flex items-center justify-center space-x-2">
              <FontAwesomeIcon className="text-black" icon={faCommentDots} />
              <div className="absolute bottom-full left-1/4 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                Falar com cliente
              </div>
            </button>
          </div>
        }
        {
          kind === "shipped" &&
          <div className="flex flex-col mt-3 space-y-2 w-1/12">
            <button onClick={() => {onEvolve()}} className="hover:bg-green-200 text-gray py-2 rounded-lg shadow-md flex items-center justify-center mt-2 space-x-2">
              <FontAwesomeIcon className="text-black" icon={faCheck} />
            </button>
            {/* <button className="hover:bg-slate-200 text-gray py-2 rounded-lg shadow-md flex items-center justify-center space-x-2"> */}
            {/*   <FontAwesomeIcon className="text-black" icon={faBan} /> */}
            {/* </button> */}
            {/* <button className="hover:bg-emerald-400 text-gray py-2 rounded-lg shadow-md flex items-center justify-center space-x-2"> */}
            {/*   <FontAwesomeIcon className="text-black" icon={faCommentDots} /> */}
            {/* </button> */}
          </div>
        }
      </div>
    </div>
  );
};

export default OrderCard;
