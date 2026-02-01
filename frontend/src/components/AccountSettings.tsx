import { UserMinusIcon } from "@heroicons/react/20/solid";
import {
  ArrowLeftIcon,
  PencilIcon,
  UserIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { useState } from "react";

export default function AccountSettings() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
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
      onClick: () => {
        setOpen(true);
      },
      danger: true,
    },
  ];
  const deleteAccount = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/delete`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Error al eliminar la cuenta");
      }

      // éxito → cerrar sesión o redirigir
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
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
      <>
        <Dialog open={open} onClose={setOpen} className="relative z-50">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-sm rounded-xl bg-slate-900 border border-slate-800 p-6 text-slate-100">
              <Dialog.Title className="text-base font-semibold">
                Eliminar cuenta
              </Dialog.Title>

              <p className="mt-2 text-sm text-slate-400">
                Esta acción es permanente. Se eliminarán todos tus datos y no
                podrás recuperarlos.
              </p>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 text-sm rounded-md hover:bg-slate-800"
                >
                  Cancelar
                </button>

                <button
                  onClick={deleteAccount}
                  className="px-4 py-2 text-sm rounded-md bg-red-500/10 text-red-400 hover:bg-red-500/20"
                >
                  Eliminar
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </>
    </>
  );
}
