import type { AuthState, AuthAction } from "./auth.types";

export const authInitialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  message: "",
};

export function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        message: action.payload.message,
      };

    case "LOGOUT":
      return authInitialState;

    default:
      return state;
  }
}
