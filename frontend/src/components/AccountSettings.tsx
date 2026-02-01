import { UserMinusIcon } from "@heroicons/react/20/solid";
import {
  ArrowLeftIcon,
  PencilIcon,
  UserIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const settingsItems = [
  {
    label: "Editar perfil",
    icon: PencilIcon,
    onClick: () => {},
  },
  {
    label: "Cuenta",
    icon: UserIcon,
    onClick: () => {},
  },
  {
    label: "Privacidad y seguridad",
    icon: ShieldCheckIcon,
    onClick: () => {},
  },
  {
    label: "Eliminar Cuenta",
    icon: UserMinusIcon,
    onClick: () => {},
    danger: true,
  },
];

export default function AccountSettings() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col bg-slate-900 text-slate-100">
      {/* Top bar */}
      <header className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-md hover:bg-slate-800"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </button>

        <h1 className="text-sm font-semibold">Cuenta</h1>

        <button className="p-2 rounded-md hover:bg-slate-800">
          <PencilIcon className="h-5 w-5" />
        </button>
      </header>

      {/* Profile */}
      <div className="flex flex-col items-center gap-4 p-6">
        <img
          src="https://i.pravatar.cc/120"
          alt="avatar"
          className="h-28 w-28 rounded-full object-cover"
        />

        <div className="text-center">
          <p className="text-lg font-semibold">Juan Pérez</p>
          <p className="text-sm text-slate-400">en línea</p>
        </div>
      </div>

      {/* Settings */}
      <div className="flex flex-col border-t border-slate-800">
        {settingsItems.map(({ label, icon: Icon, onClick, danger }) => (
          <button
            key={label}
            onClick={onClick}
            className={`flex items-center gap-3 px-4 py-3 hover:bg-slate-800 text-left ${
              danger ? "text-red-400" : ""
            }`}
          >
            <Icon className="h-5 w-5 text-slate-400" />
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
