import type { AuthState, AuthAction } from "./auth.types";

export const authInitialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  message: "",
  isLoading: true,
};

export function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        message: action.payload.message,
        isLoading: false,
      };

    case "LOGOUT":
      return { ...authInitialState, isLoading: false };

    case "SET_LOADING":
      return { ...state, isLoading: action.payload };

    default:
      return state;
  }
}
