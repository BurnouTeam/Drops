import React from "react";
import { Tooltip } from "react-tippy";
import 'react-tippy/dist/tippy.css'
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
  orderId: number;
  items: OrderItem[];
  customer: Client;
  totalPrice: number;
  payment: PaymentMethod;
  default: boolean;
  updatedAt: string;
  status: string;
  onEvolve: () => void;
  onDelete: () => void;
  onMessage: () => void;
}

const OrderCard: React.FC<OrderCardProps> = ({
  orderId = "",
  items = [],
  customer,
  payment = "PIX",
  status = "",
  totalPrice = 0,
  updatedAt = "",
  default: isDefault,
  onEvolve,
  onDelete,
  onMessage,
}) => {

  const defaultClass = isDefault ? "animate-glow hover:animate-none" : "border-gray-200";
  const sendMessage = () => {
    // const message = `Olá, seu pedido #${orderId} foi enviado!\nEstamos enviando sua compra para ${customer?.street}.\n\nO valor total é de R$ ${totalPrice}.\n\nObrigado por comprar conosco!`;
    // const url = `https://api.whatsapp.com/send?phone=55${phone}&text=${message
    // const url = `http://localhost:3001/enviar-mensagem`
    // const splitted = customer?customer.phoneNumber.split(" "):["+55","85","996105145"];
    // const correctPhone = splitted[0].slice(1,3) + splitted[1] + (splitted[2].length === 9 ? splitted[2].slice(1,9) : splitted[2]);
    //
    // console.log(items);
    //
    // fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({numero:correctPhone, mensagem:message})
    // })
  }
  return (
    <div className={`group-one hover:border-gray-400 bg-white rounded-lg shadow-md p-4 border-2 ${defaultClass} flex flex-col justify-between space-y-4 mb-4 overflow-x-visible`}>
      {/* Order Header */}
      <div className="flex justify-between items-center">
        <span className="text-gray-500 text-sm flex items-center space-x-1">
          <FontAwesomeIcon icon={faTicket} />
          <span className={`${isDefault?"text-orange-500":"text-gray-500"}`}>#{orderId}</span>
        </span>
        <span className="text-gray-500 text-sm flex items-center space-x-1">
          <FontAwesomeIcon icon={faClock} />
          <span>{updatedAt}</span>
        </span>
      </div>

      {/* Product and Quantity */}
      <div className="flex flex-row place-content-between">
        <div className="">
          <div>
            <Tooltip
              title={items?.map( (item) => item.quantity + "x " + item.product.name).join("/n")}
              position="top-start"
              trigger="click"
              arrow={true}
              duration={100}
              delay={0}
              >
            <h2 className="text-lg text-black font-semibold mb-6">
              {items.length > 0 ?items[0].quantity + "x":""} {items.length > 0?items[0].product?.name + ((items.length > 1)?"...":""):"Pedido Vazio"}
            </h2>
            </Tooltip>
          </div>
          <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-sm px-3 py-2 rounded shadow-lg">
              {items.map((item, index) => (
                <div key={index}>
                  {item.quantity}x {item.product?.name}
                </div>
              ))}
            </div>

          {/* Customer Details */}
          <div className="space-y-2.5 ">
            <p className="text-gray-700 flex items-center space-x-2">
              <FontAwesomeIcon icon={faUser} />
              <span>{customer?.name}</span>
            </p>
            <p className="text-gray-700 flex items-center space-x-2">
              <FontAwesomeIcon icon={faPhone} />
              <span>{customer?.phoneNumber}</span>
            </p>
            <p className="w-[275px] text-gray-700 flex items-center space-x-2 whitespace-nowrap text-ellipsis truncate ">
              <FontAwesomeIcon icon={faLocationDot} />
              <span className="group-one-hover:animate-scroll">{customer?.street} - {customer?.number} - {customer?.cep}</span>
            </p>
            <p className="text-gray-700 flex items-center gap-x-6">
              {/* Payment Details */}
              <span className="mr-4"><FontAwesomeIcon icon={faReceipt}/> R$ {new Intl.NumberFormat('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(totalPrice)}</span>
              <span><FontAwesomeIcon icon={faDollarSign}/> {payment}</span>
            </p>
          </div>

        </div>

        {/* Action Buttons */}
        {
          status==="pending" &&

          <div className="flex flex-col place-content-around space-y-2 ">
            <Tooltip
              title="Enviar"
              position="top"
              trigger="mouseenter"
              arrow={true}
              duration={100}
              delay={100}
            >
              <button onClick={() => {onEvolve(); sendMessage()}} className="hover:bg-orange-300 text-gray py-2 rounded-lg shadow-md flex items-center justify-center mt-2 px-2 ">
                <FontAwesomeIcon className="text-black " icon={faPaperPlane} />
              </button>
            </Tooltip>
            <Tooltip
              title="Cancelar"
              position="top"
              trigger="mouseenter"
              arrow={true}
              duration={100}
              delay={100}
            >
              <button onClick={() => {onDelete()}} className="relative group hover:bg-slate-200 text-gray py-2 rounded-lg shadow-md flex items-center justify-center mt-2 px-2">
                <FontAwesomeIcon className="text-black" icon={faBan} />
              </button>
            </Tooltip>
            <Tooltip
              title="Mandar Mensagem"
              position="top"
              trigger="mouseenter"
              arrow={true}
              duration={100}
              delay={100}
            >
              <button onClick={() => {onMessage()}} className="relative group hover:bg-emerald-400 text-gray py-2 rounded-lg shadow-md flex items-center justify-center mt-2 px-2">
                <FontAwesomeIcon className="text-black" icon={faCommentDots} />
              </button>
            </Tooltip>
          </div>
        }
        {
          status === "shipped" &&
          <div className="flex flex-col mt-3 space-y-6">
            <Tooltip
              title="Concluir"
              position="top"
              trigger="mouseenter"
              arrow={true}
              duration={100}
              delay={100}
            >
            <button onClick={() => {onEvolve()}} className=" relative group hover:bg-green-200 text-gray py-2 rounded-lg shadow-md flex items-center justify-center mt-2 px-2">
                <FontAwesomeIcon className="text-black" icon={faCheck} />
            </button>
            </Tooltip>
            <Tooltip
              title="Cancelar"
              position="top"
              trigger="mouseenter"
              arrow={true}
              duration={100}
              delay={100}
            >
              <button onClick={() => {onDelete()}} className="relative group hover:bg-slate-200 text-gray py-2 rounded-lg shadow-md flex items-center justify-center px-2 mt-2">
                <FontAwesomeIcon className="text-black" icon={faBan} />
              </button>
            </Tooltip>
          </div>
        }
      </div>
    </div>
  );
};

export default OrderCard;
