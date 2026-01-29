import { useEffect, useState } from "react";

type User = {
  id: string;
  username: string;
  profile_picture: string | null;
  status: string;
  last_seen: string | null;
};

export default function Contacts() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/users/all`)
      .then((res) => res.json())
      .then((res) => setUsers(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="mt-auto border-t border-slate-800 p-3">
      <h3 className="text-sm font-semibold text-slate-400 mb-3">Contactos</h3>

      <div className="flex flex-col gap-2">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800 transition"
          >
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-sm font-bold">
              {user.profile_picture ? (
                <img src={user.profile_picture} className="rounded-full" />
              ) : (
                user.username[0].toUpperCase()
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col">
              <span className="text-sm font-medium">{user.username}</span>
              <span className="text-xs text-slate-400">
                {user.last_seen ?? user.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
