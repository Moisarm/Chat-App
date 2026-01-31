import { createContext, useContext, useReducer, useEffect } from "react";
import { authReducer, authInitialState } from "./auth.reducer";
import type { AuthState, AuthAction } from "./auth.types";

type AuthContextType = {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  // 🔁 hidratar desde localStorage
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const user = localStorage.getItem("user");

    if (token && user) {
      dispatch({
        type: "LOGIN",
        payload: {
          token,
          user: JSON.parse(user),
          message: "",
        },
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
}
