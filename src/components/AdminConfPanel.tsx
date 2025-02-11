import React from "react";
import { UseFormRegister, UseFormHandleSubmit, FieldErrors } from "react-hook-form";
import UserPanel from "./UserPanel";

interface AdminConfPanelProps {
  register: UseFormRegister<AdminConfFormValues>;
  handleSubmit: UseFormHandleSubmit<AdminConfFormValues>;
  onSubmit: (data: AdminConfFormValues) => void;
  errors: FieldErrors<AdminConfFormValues>;
}

interface AdminConfFormValues {
  organizationName: string;
  organizationEmail: string;
  organizationCNPJ: string;
  organizationWppNumber: string;
}

const AdminConfPanel: React.FC<AdminConfPanelProps> = ({ register, handleSubmit, onSubmit, errors }) => {

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="ml-6 p-6 bg-[#F3F3F3] rounded-2xl">
      <h2 className="text-2xl mb-10 font-bold text-gray-800 ">Configuração da Organização</h2>

      {/* Organization Name */}
      <div className="grid grid-cols-2 gap-12">
        <div>
          <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700">
            Nome da Organização
          </label>
          <input
            type="text"
            id="organizationName"
            {...register("organizationName", { required: "Nome da organização é obrigatório" })}
            className={`mt-2 block w-full px-4 py-3 text-lg rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              errors.organizationName ? "border-red-500" : ""
            }`}
          />
          {errors.organizationName && <p className="text-sm text-red-500 mt-1">{errors.organizationName.message}</p>}
        </div>

        {/* Organization Email */}
        <div className="">
          <label htmlFor="organizationEmail" className="block text-sm font-medium text-gray-700">
            Email da Organização
          </label>
          <input
            type="email"
            id="organizationEmail"
            {...register("organizationEmail", {
              required: "Organization email is required",
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" },
            })}
            className={`mt-2 block w-full px-4 py-3 text-lg rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              errors.organizationEmail ? "border-red-500" : ""
            }`}
          />
          {errors.organizationEmail && <p className="text-sm text-red-500 mt-1">{errors.organizationEmail.message}</p>}
        </div>

        {/* Organization CNPJ */}
        <div>
          <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700">
            CNPJ da Organização
          </label>
          <input
            type="text"
            id="organizationCNPJ"
            {...register("organizationCNPJ", { required: "CNPJ da organização é obrigatório" })}
            className={`mt-2 block w-full px-4 py-3 text-lg rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              errors.organizationCNPJ ? "border-red-500" : ""
            }`}
          />
          {errors.organizationCNPJ && <p className="text-sm text-red-500 mt-1">{errors.organizationCNPJ.message}</p>}
        </div>

        {/* Organization WPP NUMBER */}
        <div>
          <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700">
            Número do Whatsapp da Organização
          </label>
          <input
            type="text"
            id="organizationWppNumber"
            {...register("organizationWppNumber")}
            className={`mt-2 block w-full px-4 py-3 text-lg rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              errors.organizationWppNumber ? "border-red-500" : ""
            }`}
          />
          {errors.organizationName && <p className="text-sm text-red-500 mt-1">{errors.organizationName.message}</p>}
        </div>

      {/* User Area Section */}
      <div className="flex w-full col-span-2">
        <UserPanel></UserPanel>
      </div>

      </div>
        {/* Submit Button */}
        <div className="mt-10 flex justify-end">
          <button
            type="submit"
            className="rounded-lg bg-blue-600 py-3 px-6 text-lg font-medium text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Salvar Alterações
          </button>
        </div>
    </form>
  );
};

export default AdminConfPanel;
