import { useForm } from "react-hook-form";
import { useAuthStore } from "../store/authStore";

export const ForgotPasswordForm = ({ onSwitch }) => {
  // | enviar información y que quede almacenada | acceder a los errores e indicar que hacer con ellos
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const login = useAuthStore((state) => state.login);
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);

  const submit = async (data) => {
    // la información que se envíe de los input se guarda en la data
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-800 mb-1.5">
          Email
        </label>

        <input
          id="email"
          type="email"
          placeholder="correo@ejemplo.com"
          className="w-full px-3 py-2 border rounded-lg"
          {...register("email", {
            // Las Validaciones que quiera
            required: "Este campo es requerido",
          })}
        />

        {errors.email && (
          <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-main-blue text-white py-2 rounded-lg disabled:opacity-50 hover:opacity-90"
      >
        Enviar correo
      </button>

      <p className="text-center text-sm text-gray-600">
        ¿Recordaste tu contraseña? {""}
        <button
          type="button"
          className="text-main-blue font-medium hover:opacity-80"
          onClick={onSwitch}
        >
          Iniciar Sesión
        </button>
      </p>
    </form>
  );
};
