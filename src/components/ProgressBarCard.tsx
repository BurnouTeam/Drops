import { faChartBar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface ProgressBarCardProps {
  data: Product[];
  orderBy: string;
}

const ProgressBarCard: React.FC<ProgressBarCardProps> = ({ data = [] , orderBy="asc"}) => {

  let filtered: Product[] = [];
  if (data){
    filtered = orderBy.toLowerCase() === "asc" ? data?.sort( (a,b) => {return a.quantity - b.quantity} ): data;
  }

  return (
    <div className="border-l">
      <div className="w-1/2">
        <div className={`flex flex-row mb-4 px-8`}>
          <h2 className={`text-xl font-bold mb-2 text-black`}>{<FontAwesomeIcon icon={faChartBar} />} Estoque</h2>
        </div>
      </div>
      <div className="">
        <div
          className="overflow-y-auto"
          style={{
            maxHeight: "210px",
          }}
        >
          {filtered.map((item, index) => {

            const low = (item.quantity <= 20);
            const barColor = low ? "#FA7A00" : "#008Af6";
            const font = !low ? "font-medium" : "font-bold";

            return (
            <div key={index} className="flex justify-end items-center">
              <span className={`mr-2 ${font} text-lg`}>{item.name} {item.type.name}</span>
              <div className="w-[60%] bg-gray-200 rounded-full h-4">
                <div
                  className="h-4 rounded-full"
                  style={{
                    width: `${(item.quantity / (item.total?item.total:100)) * 100}%`,
                    backgroundColor: `${barColor}`
                  }}
                ></div>
              </div>

              <div className="flex ml-2 justify-end text-sm text-gray-600 mt-1">
                {String(item.quantity).padStart(3,"0")}/{item.total?item.total:100}
              </div>
            </div>
          )})}
        </div>
      </div>
    </div>
  );
};

export default ProgressBarCard;
