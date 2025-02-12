import { FC, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import api from '../utils/api';

interface UserEditModalProps {
  isOpen: boolean;
  data: User
  onClose: (user: User | null) => void;
}

type UserEditFormInputs = {
  id: number;
  name: string;
  email: string;
  password: string;
  roleId: number;
}

const UserEditModal: FC<UserEditModalProps> = ({ isOpen, onClose, data}) => {

  const {
    register,
    getValues,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<UserEditFormInputs>({
    defaultValues: {
      id: data?.id,
      name: data?.name || '',
      email: data?.email || '',
      password: '',
      roleId: data?.roleId || 1,
    }
  });

  // Reset the form whenever `data` changes
  useEffect(() => {
    if (data) {
      reset({
        id: data?.id,
        name: data?.name ?? '',
        email: data?.email ?? '',
        password: '',
        roleId: data?.roleId || 1,
      });
    }
  }, [data, reset]);

  const [ roleOptions, setRoleOptions ] = useState<Role[]>([]);

  const fetchRole = async () => {
    const organizationId = 2;
    try {
      const response = await api.get<Role[]>(`/user/role/${organizationId}`);

      if (response.status !== 200) {
        throw new Error("Não foi possível pegar os cargos")
      }
      setRoleOptions(response.data)
    } catch (error){
      console.log(error);
    }
  }

  useEffect( () => {
    fetchRole()
  }, [] )

  const editUser = async (data: UserEditFormInputs): Promise<User> => {
    try {
      const response = await api.patch<User>(`/user/${data.id}`, {
        ...data,
        organizationId:2
      });

      if (response.status !== 200) {
        throw new Error("Usuário não foi editado com sucesso.")
      }
      return response.data;

    } catch (error) {
      console.error("Erro ao criar o usere:", error);
      throw new Error("Usuário não foi criado com sucesso.")
    }
  }

  if (!isOpen) return null;

  const onSubmit: SubmitHandler<UserEditFormInputs> = async (data) => {
    const user: User = await editUser(data);
    if (user){
      console.log(user)
      onClose(user)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Novo Usuário</h2>
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
            {/* User Input */}
            <div>
                <label htmlFor="name" className="block text-left text-sm font-medium text-gray-700">
                Nome
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Nome"
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  {...register("name")}
                />
            </div>
            <div>
              <label htmlFor="email" className="block text-left text-sm font-medium text-gray-700">
              Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                {...register("email")}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-left text-sm font-medium text-gray-700">
              Senha
              </label>
              <input
                id="password"
                type="password"
                placeholder="Senha"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                {...register("password")}
              />
            </div>
            <div>
              <label htmlFor="roleId" className="block text-left text-sm font-medium text-gray-700">
              Cargo
              </label>
              <div>
                  <select
                    id="roleId"
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    {...register("roleId", {
                      valueAsNumber: true,
                      onChange: (e) => setValue("roleId", Number(e.target.value)),
                    })}
                  >
                    {roleOptions?.map((role: Role) => (
                        <option key={role.id} value={role.id}>{role.name}</option>
                    ))}
                  </select>
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
              onClick={handleSubmit(onSubmit)}
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

export default UserEditModal;
