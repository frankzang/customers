import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";

function AppProviders({ children }) {
  return (
    <Auth0Provider
      domain="dev-ua4nvs55.us.auth0.com"
      clientId="hX4GJSyYTTfUIEAHd60NMRGH75gTwXyP"
      redirectUri={window.location.origin}
    >
      <BrowserRouter>{children}</BrowserRouter>
    </Auth0Provider>
  );
}

export { AppProviders };
