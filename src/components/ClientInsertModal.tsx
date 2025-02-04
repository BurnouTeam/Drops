import { FC, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";

interface ClientInsertModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ClientFormInputs = {
  name: string,
  quantity: number,
  type: string,
  price: number,
}

const ClientInsertModal: FC<ClientInsertModalProps> = ({ isOpen, onClose }) => {

  const [quantity, setQuantity] = useState(0);
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientFormInputs>({
    defaultValues: {
      quantity: 0,
    }
  });

  if (!isOpen) return null;

  const onSubmit: SubmitHandler<ClientFormInputs> = (data) => {
    console.log(data);
  }

  const handleChangeValue = (increment: number) => {
    const result = getValues("quantity") + increment;
    if (result > -1){
      setValue("quantity", result)
    }

  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Novo Cliente</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        {/* Modal Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            {/* Client Input */}
            <div className="flex gap-x-3.5">
              <input
                id="product-name"
                type="text"
                placeholder="Produto"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                {...register("name")}
              />
            <div className="flex items-center p-1 bg-gray-200  rounded-md">
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => {handleChangeValue(-1)}}
                  className="w-9 h-9 flex items-center justify-center border bg-white rounded-md text-gray-700 hover:bg-gray-100"
                >
                  -
                </button>
                <input
                  type="text"
                  className="w-12 text-center bg-gray-200 border  rounded-md"
                  {...register("quantity")}
                />
                <button
                  type="button"
                  onClick={() => {handleChangeValue(1)}}
                  className="w-9 h-9 flex items-center justify-center border bg-white rounded-md text-gray-700 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
            </div>
            {/* Quantity Selector */}
            {/* Type and Value */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tipo
                </label>
                <select
                  id="type"
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  {...register("type")}
                >
                  <option>Selecione</option>
                  <option>Tipo 1</option>
                  <option>Tipo 2</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="value"
                  className="block text-sm font-medium text-gray-700"
                >
                  Valor
                </label>
                <input
                  id="value"
                  type="text"
                  placeholder="R$ 0,00"
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  {...register("price")}
                />
              </div>
            </div>
          </div>
          {/* Buttons */}
          <div className="mt-6 flex justify-end space-x-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientInsertModal;
