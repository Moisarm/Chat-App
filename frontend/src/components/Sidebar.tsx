import { Outlet } from "react-router-dom";
import Contacts from "./Contacts";

export default function Sidebar() {
  return (
    <aside className="w-300px  p-4 flex flex-col h-screen">
      {/* Header sticky */}
      <Outlet />

      {/* Contacts con scroll */}
      <div className="flex-1 overflow-y-auto mt-4 ">
        <Contacts />
      </div>
    </aside>
  );
}
