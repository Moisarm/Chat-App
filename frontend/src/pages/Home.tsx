import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";

export default function Home() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className="flex h-screen w-screen bg-slate-900 text-slate-100">
      {/* Sidebar */}
      <aside className="w-80 bg-slate-950 border-r border-slate-800 flex flex-col">
        <Sidebar />
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col ">
        {/* Top bar */}
        <header className="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-950">
          <span className="ml-auto text-sm text-slate-300">
            {user?.username}
          </span>
        </header>

        <div className="flex-1 overflow-y-auto   flex">
          <Chat />
        </div>
      </main>
    </div>
  );
}
