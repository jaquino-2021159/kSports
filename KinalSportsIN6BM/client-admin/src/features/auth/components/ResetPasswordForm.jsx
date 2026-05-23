import { useForm } from "react-hook-form";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export const ResetPasswordForm = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const { resetPassword, loading } = useAuthStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (!token) {
      alert("Token de recuperación no encontrado en la URL.");
      return;
    }
    const result = await resetPassword(token, data.newPassword);
    if (result.success) {
      navigate("/");
    }
  };

  const password = watch("newPassword");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-800 mb-1.5">
          Nueva Contraseña
        </label>
        <input
          type="password"
          placeholder="••••••••"
          className="w-full px-3 py-2 border rounded-lg"
          {...register("newPassword", {
            required: "La contraseña es obligatoria",
            minLength: {
              value: 8,
              message: "Debe tener al menos 8 caracteres",
            },
          })}
        />
        {errors.newPassword && (
          <p className="text-red-600 text-xs mt-1">
            {errors.newPassword.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-800 mb-1.5">
          Confirmar Contraseña
        </label>
        <input
          type="password"
          placeholder="••••••••"
          className="w-full px-3 py-2 border rounded-lg"
          {...register("confirmPassword", {
            required: "Confirmar la contraseña es obligatorio",
            validate: (value) =>
              value === password || "Las contraseñas no coinciden",
          })}
        />
        {errors.confirmPassword && (
          <p className="text-red-600 text-xs mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading || !token}
        className="w-full bg-main-blue text-white py-2 rounded-lg disabled:opacity-50 hover:opacity-90"
      >
        {loading ? "Actualizando..." : "Restablecer Contraseña"}
      </button>

      {!token && (
        <p className="text-red-600 text-xs text-center font-medium">
          Error: No se encontró un token válido en la URL.
        </p>
      )}

      <p className="text-center text-sm text-gray-600">
        ¿Deseas volver?{" "}
        <button
          type="button"
          className="text-main-blue font-medium hover:opacity-80"
          onClick={() => navigate("/")}
        >
          Ir al Login
        </button>
      </p>
    </form>
  );
};
