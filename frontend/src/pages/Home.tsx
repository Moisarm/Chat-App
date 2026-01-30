import { useNavigate } from "react-router-dom";
import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("access_token");

      await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.warn("Error en logout, cerrando sesión igual");
    } finally {
      // ✅ Limpiar sesión SIEMPRE
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");

      // ✅ Volver al login
      navigate("/");
    }
  };

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className="flex h-screen w-screen bg-slate-900 text-slate-100">
      {/* Sidebar */}
      <aside className="w-80 bg-slate-950 border-r border-slate-800 flex flex-col">
        <Sidebar />
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-slate-800 bg-slate-950">
          <h1 className="text-xl font-semibold">Chat</h1>

          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-300">{user?.username}</span>

            <button
              onClick={handleLogout}
              className="text-sm text-red-400 hover:text-red-300"
            >
              Cerrar sesión
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          <Chat />
        </div>
      </main>
    </div>
  );
}
