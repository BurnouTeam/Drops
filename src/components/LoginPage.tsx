import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { Drops } from "../assets/drops.jsx";
import { login } from '../redux/userSlice';
import api from "../utils/api";

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginPage = () => {
  const [isRecovering, setIsRecovering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data: LoginFormInputs) => {
    try {
      const response = await api.post("/auth/login", { ...data, organizationId: 2 });
      if (response.status !== 200) {
        throw new Error("Invalid credentials");
      }
      const { user, token } = response.data;
      dispatch(login({ user, token }));
      navigate("/");
    } catch (error) {
      console.error('Login failed:', error);
    }
  };


  const handlePasswordRecovery = () => {
    console.log("Password recovery initiated.");
  };

  return (
    <div className="flex h-screen bg-secondary">
      <div className="w-1/2 lg:w-1/2 flex rounded-r-3xl items-center justify-center bg-white">
        {!isRecovering ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-4/5 max-w-md space-y-6"
          >
            <h1 className="text-2xl font-bold text-gray-800">
              Seja bem-vindo!
            </h1>
            <p className="text-gray-500">
              Preencha seus dados e acesse sua conta:
            </p>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                E-mail
              </label>
              <input
                type="email"
                {...register("email", { required: "E-mail é obrigatório", pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                  message: "E-mail inválido"
                } })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <span className="text-sm text-red-500">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword?"text":"password"}
                  {...register("password", {
                    required: "Senha é obrigatória",
                    minLength: 8,
                  })}
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

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Entrar
            </button>

            <p className="text-sm text-gray-600 text-center mt-4">
              <button
                type="button"
                onClick={() => setIsRecovering(true)}
                className="text-blue-500 hover:underline"
              >
                Esqueci minha senha
              </button>
            </p>
          </form>
        ) : (
          <div className="w-4/5 max-w-md space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Recuperar senha
            </h1>
            <p className="text-gray-500">
              Digite seu e-mail para receber instruções de recuperação:
            </p>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                E-mail
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="button"
              onClick={handlePasswordRecovery}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Enviar
            </button>

            <p className="text-sm text-gray-600 text-center mt-4">
              <button
                type="button"
                onClick={() => setIsRecovering(false)}
                className="text-blue-500 hover:underline"
              >
                Voltar ao login
              </button>
            </p>
          </div>
        )}
      </div>

      <div className="flex w-1/2 lg:flex bg-secondary text-white items-center justify-center">
        <Drops className="w-1/4 h-1/4 fill-white" />
      </div>
    </div>
  );
};

export default LoginPage;
