import { Navigate } from "react-router-dom";
import React from "react";
import { useAuth } from "../context/AuthContext";

type Props = {
  children: React.ReactNode;
};

export default function PrivateRoute({ children }: Props) {
  const { state } = useAuth();

  if (!state.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
