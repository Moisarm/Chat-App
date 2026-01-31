import Contacts from "./Contacts";
import SidebarMenu from "./SidebarMenu";

export default function Sidebar() {
  return (
    <aside className="w-300px  p-4 flex flex-col h-screen">
      {/* Header sticky */}
      <div className="sticky top-0 z-20 bg-slate-950 pb-2">
        <SidebarMenu />
      </div>

      {/* Contacts con scroll */}
      <div className="flex-1 overflow-y-auto mt-4">
        <Contacts />
      </div>
    </aside>
  );
}
