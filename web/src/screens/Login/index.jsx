import React from "react";
import { LoginButton } from "./LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import { Routes } from "../../configs/routes";

export default function Login() {
  const { isAuthenticated } = useAuth0();
  const history = useHistory();

  if (isAuthenticated) {
    history.replace(Routes.HOME);
  }

  return (
    <section>
      <LoginButton />
    </section>
  );
}
