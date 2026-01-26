import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";

function App() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
        {/* SIDEBAR COMPLEJO */}
        <aside
          className={`${isOpen ? "w-64" : "w-20"} transition-all duration-500 ease-in-out bg-slate-900 flex flex-col shadow-2xl relative`}>
          <div className="p-6 flex items-center gap-4">
            <div className="h-8 w-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shrink-0 shadow-lg shadow-indigo-500/30" />
            {isOpen && (
              <span className="font-bold text-white tracking-tight text-xl">
                Nexus AI
              </span>
            )}
          </div>

          <nav className="flex-1 px-4 space-y-2 mt-4">
            <Link
              to="/"
              className="flex items-center p-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl transition-all group">
              <svg
                className="w-6 h-6 group-hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              {isOpen && <span className="ml-4 font-medium">Dashboard</span>}
            </Link>
          </nav>

          {/* Botón de control de la Sidebar */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="absolute -right-3 top-20 bg-white border border-slate-200 rounded-full p-1 shadow-sm hover:scale-110 transition-transform">
            <svg
              className={`w-4 h-4 text-slate-600 ${!isOpen && "rotate-180"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </aside>

        {/* CONTENIDO PRINCIPAL */}
        <main className="flex-1 flex flex-col">
          {/* Header Superior */}
          <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
            <h1 className="text-sm font-semibold text-slate-500 uppercase tracking-widest">
              Vista General
            </h1>
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden">
                <img src="https://ui-avatars.com/api/?name=User" alt="avatar" />
              </div>
            </div>
          </header>

          {/* Área de Rutas */}
          <div className="p-8">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 min-h-[400px]">
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>

              {/* Elemento complejo de ejemplo */}
              <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-700 text-white flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
                <div className="z-10">
                  <h2 className="text-2xl font-bold">¡Tailwind está listo!</h2>
                  <p className="text-indigo-100 mt-1">
                    Has configurado correctamente el entorno de desarrollo.
                  </p>
                </div>
                <button className="z-10 px-6 py-3 bg-white text-indigo-600 font-bold rounded-xl shadow-xl hover:bg-indigo-50 transition-colors">
                  Empezar ahora
                </button>
                {/* Círculos decorativos de fondo */}
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
