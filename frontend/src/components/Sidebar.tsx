import Contacts from "./Contacts";

export default function Sidebar() {
  return (
    <aside className="w-300px border-r border-gray-300 p-4 flex flex-col h-screen overflow-y-auto">
      {/* Header */}
      <div className="mb-4 fixed">
        <h3 className="text-lg font-semibold">Chats</h3>
      </div>

      {/* Espacio flexible */}
      <div className="flex-1"></div>

      {/* Contacts abajo */}
      <div className="mt-auto">
        <Contacts />
      </div>
    </aside>
  );
}
