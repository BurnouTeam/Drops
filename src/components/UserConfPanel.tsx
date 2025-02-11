import { useForm } from "react-hook-form";

import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useEffect } from "react";

const ConfigurationPanel = () => {
  const { user } = useSelector( (state: RootState) => state.user )
  const getDefaultValues = (role?: string) => {
    if (role === "admin") {
      return {
        organizationName: "",
        organizationEmail:  "",
        organizationCNPJ:  "",
        organizationWppNumber: "",
      };
    }
    return {
      name: user?.name || "",
      email: user?.email || "",
      profilePhoto: user?.profilePhoto || "",
      password: "",
    };
  };
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: getDefaultValues(user?.role?.name),
  });

  // Reset the form whenever `data` changes
  useEffect(() => {
    if (user) {
      reset(getDefaultValues(user?.role?.name));
    }
  }, [user, reset]);

  const onSubmit = (data) => {
    onUpdate(data); // Send updated data to the parent or API
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setValue("profilePhoto", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
      <div className="p-6 bg-[#F3F3F3] rounded-2xl w-full h-full">
      {user?.role.name === "user" ? <div className="flex">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-left">
          Configuração de Usuário
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Profile Photo */}
          <div className="flex justify-center">
            <label className="cursor-pointer relative">
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              <img
                src={user?.profilePhoto || "profile-default.png"}
                alt="Profile"
                className="w-32 h-32 rounded-full border-2 border-gray-300 shadow-lg object-cover"
              />
            </label>
          </div>

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: "Name is required" })}
              className={`mt-2 block w-full px-4 py-3 text-lg rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.name ? "border-red-500" : ""
              }`}
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              className={`mt-2 block w-full px-4 py-3 text-lg rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              {...register("password")}
              className="mt-2 block w-full px-4 py-3 text-lg rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-1/8 inline-flex justify-center rounded-lg bg-blue-600 py-3 px-6 text-lg font-medium text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Salvar Alterações
            </button>
          </div>
        </form>
      </div> : null}
      {user?.role?.name === "admin" ? <div className="ml-6 p-6 bg-[#F3F3F3] rounded-2xl w-1/2">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-left">
          Configuração da Organização
        </h2>
      </div>: null}
    </div>
  );
};

export default ConfigurationPanel;


  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: getDefaultValues(user?.role?.name),
  });

  useEffect(() => {
    if (user) {
      reset(getDefaultValues(user?.role?.name));
    }
  }, [user, reset]);

  const onSubmit = (data) => {
    onUpdate(data);
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setValue("profilePhoto", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6 bg-[#F3F3F3] rounded-2xl w-full h-full">
      {user?.role?.name === "user" && (
        <UserForm
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          setValue={setValue}
          errors={errors}
          handlePhotoUpload={handlePhotoUpload}
          user={user}
        />
      )}
      {user?.role?.name === "admin" && (
        <AdminForm
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
        />
      )}
    </div>
  );
};
