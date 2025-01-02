import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { Drops } from "../assets/drops.jsx";

interface RecoveryFormInputs {
  confirm_password: string;
  password: string;
}

const RecoveryPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecoveryFormInputs>();
  const navigate = useNavigate();

  const onSubmit = (data: RecoveryFormInputs) => {
    handlePasswordRecovery(data);
    localStorage.setItem("isAuthenticated", "true");
    navigate("/panel");
  };

  const goToLogin = () => {
    navigate('/');
  }

  const handlePasswordRecovery = (data: RecoveryFormInputs) => {
    console.log("Password recovery initiated.");
    console.log(data);
  };

  return (
    <div className="flex h-screen bg-secondary">
      <div className="w-1/2 lg:w-1/2 flex rounded-r-3xl items-center justify-center bg-white">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-4/5 max-w-md space-y-6"
          >
            <h1 className="text-2xl font-bold text-gray-800">
              Defina uma nova Senha
            </h1>
            <p className="text-gray-500">
              Sua nova senha deve conter pelo menos 8 caracteres.
            </p>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword?"text":"password"}
                  {...register("password", { required: "Senha é obrigatória" })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                  >
                    {showPassword ? <FontAwesomeIcon icon={faEyeSlash}/> : <FontAwesomeIcon icon={faEye}/>}
                  </button>
                {errors.password && (
                  <span className="text-sm text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirmar Senha
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword?"text":"password"}
                  {...register("confirm_password", {
                    required: "Confirmação é obrigatória",
                  })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                  >
                    {showPassword ? <FontAwesomeIcon icon={faEyeSlash}/> : <FontAwesomeIcon icon={faEye}/>}
                  </button>
                {errors.confirm_password && (
                  <span className="text-sm text-red-500">
                    {errors.confirm_password.message}
                  </span>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Enviar
            </button>
            <p className="text-sm text-gray-600 text-center mt-4">
              <button
                type="button"
                onClick={() => goToLogin()}
                className="text-blue-500 hover:underline"
              >
                Voltar ao login
              </button>
            </p>
          </form>
      </div>

      <div className="flex w-1/2 lg:flex bg-secondary text-white items-center justify-center">
        <Drops className="w-1/4 h-1/4 fill-white" />
      </div>
    </div>
  );
};

export default RecoveryPage;
