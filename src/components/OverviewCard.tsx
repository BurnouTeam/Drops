import React from "react";

interface OverviewCardProps {
    title: string;
    number: number;
  onEvolve: () => void;
  onDelete: () => void;
  onMessage: () => void;
}

const OrderCard: React.FC<OverviewCardProps> = ({
  title,
  number
}) => {

  
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 py-1 border-2 border-indigo-200 p-4 flex-col justify-between space-y-4 mb-4">

      {/* Product and Quantity */}
      <div className="flex flex-row place-content-between">
            <div className="mt-4 text-3xl text-black font-semibold mb-2">
                <h2>{number}</h2>
                <div>
                    <h2 className="text-lg">
                        {title}
                    </h2>
                </div>        
            </div>
        </div>
    </div>
  );
};

export default OrderCard;
