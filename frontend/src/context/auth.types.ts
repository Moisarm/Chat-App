export type User = {
  id: string;
  username: string;
  email: string;
};

export type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  message: string | null;
  isLoading: boolean;
};

export type AuthAction =
  | { type: "LOGIN"; payload: { user: User; token: string; message: string } }
  | { type: "LOGOUT" }
  | { type: "SET_LOADING"; payload: boolean };
