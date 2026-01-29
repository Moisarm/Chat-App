import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <div className="flex h-screen w-screen bg-slate-900 text-slate-100">
      {/* Sidebar */}
      <aside className="w-80 bg-slate-950 border-r border-slate-800 flex flex-col">
        <Sidebar />
      </aside>

      {/* Chat area */}
      <main className="flex-1 flex flex-col bg-slate-900">
        {/* Top bar */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-slate-800 bg-slate-950 shadow-sm">
          <h1 className="text-xl font-semibold">Chat</h1>
          {/* Aquí se podría poner info de usuario después */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-700" />
            <span className="font-medium">Usuario</span>
          </div>
        </header>

        {/* Chat content */}
        <div className="flex-1 overflow-y-auto p-6">
          <Chat />
        </div>
      </main>
    </div>
  );
}
