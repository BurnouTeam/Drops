import React from "react";
import { useDispatch } from "react-redux";
import { setMenu, setChatId } from "../redux/appSlice";
import { Tooltip } from "react-tippy";
import 'react-tippy/dist/tippy.css'
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useReward } from 'react-rewards';
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
import { formatPhoneNumber } from "../utils/phone";

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
  const { reward } = useReward('rewardId', 'emoji', { emoji: ['💸','💰'], elementSize: 12, elementCount: 30, startVelocity: 20 });
  const dispatch = useDispatch();

  const sendMessage = () => {
    const start = `Olá ${customer?.name}, seu pedido foi enviado!\n`;
    const addressMessage = `Estamos enviando sua compra para\n${customer?.street} ${customer?.number}.\n\n`;
    const orderMessage = `Items no pedido:\n\n ${items.map((item)=>{return item.quantity +"x " + item.product.name + "\n"})}\n*Totalizando: R$ ${totalPrice}.*\n\n`;
    const end = `Obrigado por comprar conosco!`;
    const message = `${start}${addressMessage}${orderMessage}${end}`;
    const url = `http://localhost:3001/send`;
    const correctPhone = formatPhoneNumber(customer.phoneNumber);

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({clientId:correctPhone, content:message})
    })
  }
  const recuseMessage = () => {
    const start = `Olá ${customer?.name}, seu pedido foi cancelado!\n\n`;
    const reasonMessage = `Infelizmente não poderemos atendê-lo por motivo de força maior, pedimos nossas *sinceras* *DESCULPAS*\n\n`;
    const supportMessage = `Não se preocupe, seu dinhero será reembolsado logo mais. `;
    const end = `Obrigado por comprar conosco!`;
    const message = `${start}${reasonMessage}${supportMessage}${end}`;
    const url = `http://localhost:3001/send`;
    const correctPhone = formatPhoneNumber(customer.phoneNumber);

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({clientId:correctPhone, content:message})
    })
  }

  const finishMessage = () => {
    const start = `Mais uma vez ficamos muito felizes em lhe atender, *${customer?.name}*!\n\n`;
    const end = `Obrigado por comprar conosco e até a próxima!`;
    const message = `${start}${end}`;
    const url = `http://localhost:3001/send`;
    const correctPhone = formatPhoneNumber(customer.phoneNumber);

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({clientId:correctPhone, content:message})
    })
  }
  return (
    <motion.div
      className={`group-one hover:border-gray-400 bg-white rounded-lg shadow-md p-4 border-2 ${defaultClass} flex flex-col justify-between space-y-4 mb-4 overflow-x-visible`}
      layout
      initial={{
        opacity: 0,
        x: -100,
        y: 0
      }}
      animate={{
        opacity: 1,
        x: 0,
        y: 0
      }}
      exit={{
        opacity: 0,
        x: 0,
        y: 0
      }}
      transition={{
        type: 'spring',
        duration: 1,
        stiffness: 100,
        damping: 5,
      }}
      >
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
              <motion.button whileHover={{ scale: 1.5 }} whileTap={{ scale: 0.9 }} onClick={() => {onEvolve(); sendMessage()}} className="hover:bg-orange-300 text-gray py-2 rounded-lg shadow-md flex items-center justify-center mt-2 px-2 ">
                <FontAwesomeIcon className="text-black " icon={faPaperPlane} />
              </motion.button>
            </Tooltip>
            <Tooltip
              title="Cancelar"
              position="top"
              trigger="mouseenter"
              arrow={true}
              duration={100}
              delay={100}
            >
              <motion.button whileHover={{ scale: 1.5 }} whileTap={{ scale: 0.9 }} onClick={() => {onDelete();recuseMessage()}} className="relative group hover:bg-slate-200 text-gray py-2 rounded-lg shadow-md flex items-center justify-center mt-2 px-2">
                <FontAwesomeIcon className="text-black" icon={faBan} />
              </motion.button>
            </Tooltip>
            <Tooltip
              title="Mandar Mensagem"
              position="top"
              trigger="mouseenter"
              arrow={true}
              duration={100}
              delay={100}
            >
              <motion.button whileHover={{ scale: 1.5 }} whileTap={{ scale: 0.9 }} onClick={ () => {dispatch(setMenu("mensagens"));dispatch(setChatId(customer.phoneNumber))} } className="relative group hover:bg-emerald-400 text-gray py-2 rounded-lg shadow-md flex items-center justify-center mt-2 px-2">
                <FontAwesomeIcon className="text-black" icon={faCommentDots} />
              </motion.button>
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
            <button onClick={() => {onEvolve();finishMessage();reward()}} className=" relative group hover:bg-green-200 text-gray py-2 rounded-lg shadow-md flex items-center justify-center mt-2 px-2">
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
              <button onClick={() => {onDelete();recuseMessage()}} className="relative group hover:bg-slate-200 text-gray py-2 rounded-lg shadow-md flex items-center justify-center px-2 mt-2">
                <FontAwesomeIcon className="text-black" icon={faBan} />
              </button>
            </Tooltip>
          </div>
        }
      </div>
    </motion.div>
  );
};

export default OrderCard;
