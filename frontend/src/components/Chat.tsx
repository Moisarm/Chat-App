import { PhoneIcon } from "@heroicons/react/20/solid";
import {
  EllipsisVerticalIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";

export default function Chat() {
  return (
    <main className="flex-1 flex flex-col ">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-slate-800 p-4">
        {/* User info */}
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="relative">
            <img
              src="https://i.pravatar.cc/40"
              alt="avatar"
              className="h-10 w-10 rounded-full"
            />
            {/* Online status */}
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-slate-950" />
          </div>

          {/* Name + status */}
          <div className="leading-tight">
            <p className="font-semibold">Juan Pérez</p>
            <p className="text-xs text-slate-400">última vez hoy a las 12:45</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <PhoneIcon />
          <VideoCameraIcon />
          <EllipsisVerticalIcon />{" "}
        </div>
      </header>

      {/* Mensajes */}
      <section className="flex-1 p-4">
        <p>Hola 👋</p>
      </section>

      {/* Input */}
      <footer className="border border-slate-800 p-4 ">
        <input
          placeholder="Escribe un mensaje..."
          className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100 outline-none focus:ring-2 focus:ring-sky-400"
        />
      </footer>
    </main>
  );
}
