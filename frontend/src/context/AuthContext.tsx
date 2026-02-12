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

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data?.user) {
          dispatch({
            type: "LOGIN",
            payload: {
              token: "",
              user: data.data.user,
              message: "",
            },
          });
        }
      })
      .catch(() => {});
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
