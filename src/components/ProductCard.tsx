import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEdit,
    faTrash
  } from "@fortawesome/free-solid-svg-icons";

interface ProductCard {

    name: string;
    type: string;
    value: number;
    quantity: number;
    status: string;
    handleOpenModal: (modal: string, data?: Omit<Product, "status">) => void;
    handleCloseModal: (modal: string, data?: Omit<Product, "status">) => void;
}

const ProductCard: React.FC<ProductCard> = ({
  handleOpenModal,
  name,
  type,
  value,
  quantity,
  status
}) => {
  const data = { name: name, type: type, value: value, quantity: quantity, status: status};

  return (
    <div className="aspect-w-1 aspect-h-1 bg-white rounded-2xl shadow-md p-4 py-1 border-2 border-indigo-200 flex flex-col justify-between space-y-4 mb-4">
  
  {/* Product and Quantity */}
  <div className="flex flex-col space-y-2">
    <div className="flex items-center space-x-2 mt-4 justify-between">
      <h2 className="text-3xl text-black font-semibold mb-2">{name}</h2>

      {/* Icons */}
      <div className="flex items-center space-x-2 mt-4">
        <span className="text-gray-500 text-sm flex items-center space-x-1">
            <FontAwesomeIcon icon={faEdit} className="text-secondary hover:text-primary"/>
        </span>
        <button onClick={() => handleOpenModal("delete", data)}>
          <span className="text-gray-500 text-sm flex items-center space-x-1">
              <FontAwesomeIcon icon={faTrash}  className="text-secondary hover:text-red-500"/>
          </span>
        </button>
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

export default ProductCard;
