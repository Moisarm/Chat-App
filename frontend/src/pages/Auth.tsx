import { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";

export default function Auth() {
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="w-full max-w-sm bg-slate-950 p-8 rounded-xl shadow-lg">
        {mode === "login" ? (
          <Login onSwitch={() => setMode("register")} />
        ) : (
          <Register onSwitch={() => setMode("login")} />
        )}
      </div>
    </main>
  );
}
