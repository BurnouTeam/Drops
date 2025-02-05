import { FC, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import api from '../utils/api';

interface ClientInsertModalProps {
  isOpen: boolean;
  onClose: (client: Client | null) => void;
}

type ClientFormInputs = {
  name: string;
  phoneNumber: string;
  email: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  cep: string;
  country: string;
  organizationId: number;
}

const ClientInsertModal: FC<ClientInsertModalProps> = ({ isOpen, onClose }) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientFormInputs>({
    defaultValues: {
      country: "Brasil",
      city: "Fortaleza",
      state: "Ceará",
    }
  });

  const createClient = async (data: ClientFormInputs): Promise<Client> => {
    try {
      data.organizationId = 2;
      const response = await api.post<Client>(`/client`, {
        ...data
      });

      if (response.status !== 201) {
        throw new Error("Cliente não foi criado com sucesso.")
      }
      return response.data;

    } catch (error) {
      console.error("Erro ao criar o cliente:", error);
      throw new Error("Cliente não foi criado com sucesso.")
    }
  }

  if (!isOpen) return null;

  const onSubmit: SubmitHandler<ClientFormInputs> = async (data) => {
    const client: Client = await createClient(data);
    if (client){
      console.log(client)
      onClose(client)
    }
    console.log(data);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Novo Cliente</h2>
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
            {/* Client Input */}
            <input
              id="name"
              type="text"
              placeholder="Nome"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              {...register("name")}
            />
            <input
              id="email"
              type="email"
              placeholder="Email"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              {...register("email")}
            />
            <input
              id="phoneNumber"
              type="text"
              placeholder="Telefone"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              {...register("phoneNumber")}
            />
            {/* Quantity Selector */}
            {/* Type and Value */}
            <h3 className="text-md font-regular pt-2">Endereço</h3>
            <div className="grid grid-cols-2 gap-4">
                <input
                  id="cep"
                  type="text"
                  placeholder="CEP"
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  {...register("cep")}
                />
                <input
                  id="phoneNumber"
                  type="text"
                  placeholder="Bairro"
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  {...register("neighborhood")}
                />
            </div>
            <input
              id="street"
              type="text"
              placeholder="Rua"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              {...register("street")}
            />
            <div className="grid grid-cols-2 gap-4">
                <input
                  id="number"
                  type="text"
                  placeholder="Número"
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  {...register("number")}
                />
                <input
                  id="complement"
                  type="text"
                  placeholder="Complemento"
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  {...register("complement")}
                />
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

export default ClientInsertModal;
