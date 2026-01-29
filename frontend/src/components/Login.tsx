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
  password: z.string().min(1, "Password requerido"),
});

type FormData = z.infer<typeof schema>;

export default function Login({ onSwitch }: Props) {
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
      const payload = {
        email: data.email,
        password: data.password,
      };

      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Error al iniciar sesión");
      await res.json();

      // ✅ Login exitoso → ir a Home
      navigate("/home");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <h2 className="text-center text-xl font-semibold text-slate-100">
        Iniciar sesión
      </h2>

      {/* Email */}
      <div className="flex flex-col">
        <input
          {...register("email")}
          placeholder="Email"
          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-400"
        />
        {errors.email && (
          <p className="text-red-400 text-sm">{errors.email.message}</p>
        )}
      </div>

      {/* Password con show/hide */}
      <div className="flex flex-col relative">
        <input
          type={showPassword ? "text" : "password"}
          {...register("password")}
          placeholder="Password"
          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-400"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-2 text-sm text-sky-400"
        >
          {showPassword ? "Ocultar" : "Mostrar"}
        </button>
        {errors.password && (
          <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="mt-2 bg-sky-400 text-slate-950 font-semibold py-2 rounded-lg hover:bg-sky-300 transition"
      >
        Entrar
      </button>

      <button
        type="button"
        onClick={onSwitch}
        className="text-sm text-sky-400 hover:underline"
      >
        ¿No tienes cuenta? Regístrate
      </button>
    </form>
  );
}
