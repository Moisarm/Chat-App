import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

type Props = {
  onSwitch: () => void;
};

const schema = z.object({
  email: z.string().email("Email inválido"),
  username: z.string().min(3, "Mínimo 3 caracteres"),
  password: z.string().min(8, "Mínimo 8 caracteres"),
  profile_picture: z.any().nullable(), // opcional
});

type FormData = z.infer<typeof schema>;

export default function Register({ onSwitch }: Props) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      // ✅ Creamos un objeto JSON, profile_picture null si no hay archivo
      const payload = {
        email: data.email,
        username: data.username,
        password: data.password,
        profile_picture: null,
      };

      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Error al registrar");
      await res.json();

      // ✅ Después de registrar, vamos al login
      onSwitch();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 bg-slate-950 p-6 rounded-xl shadow-lg"
    >
      <h2 className="text-center text-2xl font-bold text-slate-100">
        Crear cuenta
      </h2>

      {/* Email */}
      <div className="flex flex-col">
        <input
          {...register("email")}
          placeholder="Email"
          className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-400"
        />
        {errors.email && (
          <span className="text-red-400 text-sm mt-1">
            {errors.email.message}
          </span>
        )}
      </div>

      {/* Username */}
      <div className="flex flex-col">
        <input
          {...register("username")}
          placeholder="Username"
          className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-400"
        />
        {errors.username && (
          <span className="text-red-400 text-sm mt-1">
            {errors.username.message}
          </span>
        )}
      </div>

      {/* Password con show/hide */}
      <div className="flex flex-col relative">
        <input
          type={showPassword ? "text" : "password"}
          {...register("password")}
          placeholder="Password"
          className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-400 w-full"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-2 text-sm text-sky-400"
        >
          {showPassword ? "Ocultar" : "Mostrar"}
        </button>
        {errors.password && (
          <span className="text-red-400 text-sm mt-1">
            {errors.password.message}
          </span>
        )}
      </div>

      {/* Botones */}
      <button
        type="submit"
        className="mt-4 bg-sky-400 text-slate-950 font-semibold py-2 rounded-lg hover:bg-sky-300 transition"
      >
        Registrarse
      </button>

      <button
        type="button"
        onClick={onSwitch}
        className="mt-2 text-sm text-sky-400 hover:underline"
      >
        ¿Ya tienes cuenta? Inicia sesión
      </button>
    </form>
  );
}
