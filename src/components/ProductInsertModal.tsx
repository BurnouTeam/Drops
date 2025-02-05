import { FC, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import api from '../utils/api';

interface ProductInsertModalProps {
  isOpen: boolean;
  onClose: (product: Product | null) => void;
  products: Product[];
}

type ProductFormInputs = {
  name: string,
  price: number,
  quantity: number,
  organizationId: number,
  typeId: number
}

const ProductInsertModal: FC<ProductInsertModalProps> = ({ isOpen, onClose, products }) => {

  const [ types, setTypes ] = useState<ProductType[]>([]);
  const {
    register,
    reset,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormInputs>({
    defaultValues: {
      quantity: 0,
      typeId: 1,
      price: 10,
    }
  });

  const fetchTypes = async (): Promise<void> => {
    try {
      const response = await api.get("/product/types/2");
      if ( response.status === 200 ) {
        setTypes(response.data.sort());
      }
    } catch ( error ) {
      console.error('Failed to fetch orders:', error);
    }
  }

  const createProduct = async (data: ProductFormInputs): Promise<Product> => {
    try {
      data.organizationId = 2;
      const response = await api.post<Product>(`/product`, {
        ...data
      });

      if (response.status !== 201) {
        throw new Error("Produto não foi criado com sucesso.")
      }
      return response.data;

    } catch (error) {
      console.error("Erro ao criar o produto:", error);
      throw new Error("Produto não foi criado com sucesso.")
    }
  }

  useEffect(() => {
    reset({
      quantity: 0,
      typeId: 1,
      price: 10,
    });
  }, [reset]);

  useEffect(() => {
    fetchTypes();
  }, []);

  if (!isOpen) return null;

  const onSubmit: SubmitHandler<ProductFormInputs> = async (data) => {
    const product: Product = await createProduct(data);
    if (product){
      console.log(product)
      onClose(product)
    }
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
          <h2 className="text-lg font-semibold">Novo Produto</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => onClose(null)}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        {/* Modal Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            {/* Product Input */}
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
                  type="number"
                  className="w-12 text-center bg-gray-200 border  rounded-md"
                  {...register("quantity", { valueAsNumber: true })}
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
                  id="typeId"
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  {...register("typeId", { valueAsNumber: true })}
                >
                  <option disabled>Selecione</option>
                  {types?.map((type: ProductType, index: number) => (
                      <option key={index} value={type.id}>{type.name}</option>
                  ))}
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
                  type="number"
                  placeholder="R$ 0,00"
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  {...register("price", { valueAsNumber: true })}
                />
              </div>
            </div>
          </div>
          {/* Buttons */}
          <div className="mt-6 flex justify-end space-x-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              onClick={() => onClose(null)}
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

export default ProductInsertModal;
