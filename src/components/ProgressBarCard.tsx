import React from "react";

interface ProgressBarCardProps {
  data: Product[];
}

const ProgressBarCard: React.FC<ProgressBarCardProps> = ({ data = [] }) => {

  return (
    <div className="w-1/2 rounded-lg">
        <div className="p-4">
          <div
            className="overflow-y-auto"
            style={{
              maxHeight: "210px",
            }}
          >
            {data.map((item, index) => (
              <div key={index} className="flex justify-end items-center">
                <span className="mr-2 font-medium text-lg">{item.name} {item.type}</span>
                <div className="w-[60%] bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-blue-500 h-4 rounded-full"
                    style={{
                      width: `${(item.quantity / (item.total?item.total:100)) * 100}%`,
                    }}
                  ></div>
                </div>

                <div className="flex ml-2 justify-end text-sm text-gray-600 mt-1">
                  {String(item.quantity).padStart(3,"0")}/{item.total?item.total:100}
                </div>
              </div>
            ))}
          </div>
        </div>
    </div>
  );
};

export default ProgressBarCard;
