import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus,
    faTrash
  } from "@fortawesome/free-solid-svg-icons";


 
interface NewProductCard {
    handleOpenModal: (modal: string, data?: Omit<Product, "status">) => void;
}

const NewProductCard: React.FC<NewProductCard> = ({ handleOpenModal
 
}) => {

  return (
    <div className="spect-w-1 aspect-h-1 bg-white rounded-2xl shadow-md p-4 py-1 border-2 border-indigo-200 border-dashed flex flex-col justify-between space-y-4 mb-4">
  
  {/* Product and Quantity */}
  <div className="flex items-center justify-center flex-col space-y-2 mt-8">
    <button onClick={() => handleOpenModal("new")}>
        <span className="text-3xl text-indigo-200"><FontAwesomeIcon icon={faPlus} /></span>
        <h2 className="text-center mt-4 text-indigo-200">Novo Produto</h2>  
      </button>
  </div>
  
</div>
  );
};

export default NewProductCard;
