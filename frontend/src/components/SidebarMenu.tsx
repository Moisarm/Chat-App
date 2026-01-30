import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import {
  ArrowLeftStartOnRectangleIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { PlayCircleIcon } from "@heroicons/react/20/solid";
import {
  ArrowPathIcon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const solutions = [
  {
    name: "Analytics",
    description: "Get a better understanding of your traffic",
    href: "#",
    icon: ChartPieIcon,
  },
  {
    name: "Engagement",
    description: "Speak directly to your customers",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Security",
    description: "Your customers' data will be safe and secure",
    href: "#",
    icon: FingerPrintIcon,
  },
  {
    name: "Integrations",
    description: "Connect with third-party tools",
    href: "#",
    icon: SquaresPlusIcon,
  },
  {
    name: "Automations",
    description: "Build strategic funnels that will convert",
    href: "#",
    icon: ArrowPathIcon,
  },
];

const callsToAction = [
  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Cerrar Sesión", href: "#", icon: ArrowLeftStartOnRectangleIcon },
];

export default function SidebarMenu() {
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
  return (
    <Popover className="relative">
      <PopoverButton className="p-2 rounded-md hover:bg-slate-800 text-white">
        <Bars3Icon className="h-6 w-6" />
      </PopoverButton>

      <PopoverPanel
        transition
        className="absolute left-0 z-20 mt-3 w-screen max-w-md bg-transparent px-2 transition data-closed:translate-y-1 data-closed:opacity-0"
      >
        <div className="overflow-hidden rounded-2xl bg-gray-800 text-sm  outline-1 outline-white/10">
          <div className="p-4">
            {solutions.map((item) => (
              <div
                key={item.name}
                className="group flex gap-x-4 rounded-lg p-3 hover:bg-white/5"
              >
                <div className="flex size-10 items-center justify-center rounded-lg bg-gray-700/50">
                  <item.icon className="size-5 text-gray-400 group-hover:text-white" />
                </div>
                <div>
                  <a href={item.href} className="font-semibold text-white">
                    {item.name}
                  </a>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 divide-x divide-white/10 bg-gray-700/50">
            {callsToAction.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={handleLogout}
                className="flex items-center justify-center gap-x-2 p-3 font-semibold text-white hover:bg-gray-700/50"
              >
                <item.icon className="size-5 text-gray-400" />
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </PopoverPanel>
    </Popover>
  );
}
