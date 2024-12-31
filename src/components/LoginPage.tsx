// src/components/LoginPage.tsx
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Drops } from '../assets/drops.jsx'

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const navigate = useNavigate();

  const onSubmit = (data: LoginFormInputs) => {
    // Simulate login success
    makeLoginApiRequest(data)
    localStorage.setItem("isAuthenticated", "true");
    navigate("/panel");
  };

  const makeLoginApiRequest = (data: LoginFormInputs) => {
    // TODO: Make the backend request to login, its mocked
    console.log("Login Successful", data);

  }

  return (
    <div className="flex h-screen bg-secondary">
      <div className="w-1/2 lg:w-1/2 flex rounded-r-3xl items-center justify-center bg-white">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-4/5 max-w-md space-y-6"
        >
          <h1 className="text-2xl font-bold text-gray-800">Seja bem-vindo!</h1>
          <p className="text-gray-500">Preencha seus dados e acesse sua conta:</p>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              E-mail
            </label>
            <input
              type="email"
              {...register("email", { required: "E-mail é obrigatório" })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <span className="text-sm text-red-500">{errors.email.message}</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              type="password"
              {...register("password", { required: "Senha é obrigatória" })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <span className="text-sm text-red-500">{errors.password.message}</span>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Entrar
          </button>
        </form>
      </div>

      <div className="hidden flex w-1/2 lg:flex bg-secondary text-white items-center justify-center">
        <Drops className="w-1/4 h-1/4"/>
      </div>
    </div>
  );
};

export default LoginPage;

