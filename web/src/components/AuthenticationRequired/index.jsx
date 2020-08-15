import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import { Routes } from "../../configs/routes";

export function AuthenticationRequired({ children }) {
  const { isAuthenticated, isLoading } = useAuth0();
  const history = useHistory();

  if (isLoading) return <div>Loading user...</div>;
  if (isAuthenticated) return children ?? null;

  history.replace(Routes.LOGIN);

  return null;
}
