import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEdit,
    faTrash
} from "@fortawesome/free-solid-svg-icons";

interface ProductCardProps {

    id: number;
    name: string;
    type: string;
    price: number;
    quantity: number;
    status: string;
    handleOpenModal: (modal: string, data?: Product) => void;
    handleCloseModal: (modal: string, data?: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  type,
  price,
  quantity,
  status,
  handleOpenModal,
  handleCloseModal
}) => {

  const bgColor = (status === "Em Estoque") ? "bg-green-200" : (status === "Estoque Baixo") ? "bg-orange-200":"bg-red-300";
  const low = (quantity <= 20);
  const barColor = low ? "#FA7A00" : "#008Af6";
  const font = !low ? "font-medium" : "font-bold";
  const data = { name: name, type: type, price: price, quantity: quantity, status: status, id: id};

  return (
    <div className={`aspect-w-1 aspect-h-1 bg-white rounded-2xl shadow-md p-4 py-1 border-2  flex flex-col justify-between space-y-4 mb-4`}>

  {/* Product and Quantity */}
  <div className="flex flex-col space-y-2">
    <div className="flex items-center space-x-2 mt-4 justify-between">
      <h2 className="text-3xl text-black font-semibold mb-2">{name} {type}</h2>

      {/* Icons */}
      <div className="flex items-center space-x-2 mt-4">
        <button onClick={() => handleOpenModal("edit", data)}>
          <span className="text-gray-500 text-sm flex items-center space-x-1">
              <FontAwesomeIcon icon={faEdit} className="text-secondary hover:text-primary"/>
          </span>
        </button>
        <button onClick={() => handleOpenModal("delete", data)}>
          <span className="text-gray-500 text-sm flex items-center space-x-1">
              <FontAwesomeIcon icon={faTrash}  className="text-secondary hover:text-red-500"/>
          </span>
        </button>
      </div>
    </div>

    <div className="flex items-center space-x-2 mt-4 justify-between">
      <h2>R$ {price.toFixed(2)}</h2>
    </div>
    <div className="flex items-center align-text-bottom space-x-20 mt-4 justify-between">
      <h2 className="text-lg">{quantity} und.</h2>
              <div className="relative text-center m-4 h-10 w-full bg-gray-200 rounded-xl flex items-center justify-center font-semibold overflow-hidden">
                <div
                  className="absolute top-0 left-0 w-full text-center border-1 h-4 rounded-xl transition-all duration-300"
                  style={{
                    width: `${(quantity / 100) * 100}%`,
                    height: `40px`,
                    backgroundColor: `${barColor}`
                  }}
                ></div>
              <span className="relative z-10">{status}</span>
              </div>
    </div>
  </div>

</div>
  );
};

export default ProductCard;
