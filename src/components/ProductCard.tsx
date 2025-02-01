import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEdit,
    faTrash
} from "@fortawesome/free-solid-svg-icons";

interface ProductCardProps {

    name: string;
    type: string;
    price: number;
    quantity: number;
    status: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  type,
  price,
  quantity,
  status
}) => {

  const borderColor = (status === "Em Estoque") ? "border-green-200" : (status === "Estoque Baixo") ? "border-orange-200":"border-red-500";

  return (
    <div className={`aspect-w-1 aspect-h-1 bg-white rounded-2xl shadow-md p-4 py-1 border-2 ${borderColor} flex flex-col justify-between space-y-4 mb-4`}>

  {/* Product and Quantity */}
  <div className="flex flex-col space-y-2">
    <div className="flex items-center space-x-2 mt-4 justify-between">
      <h2 className="text-3xl text-black font-semibold mb-2">{name} {type}</h2>

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
      <h2>R$ {price.toFixed(2)}</h2>
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
