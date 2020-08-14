import React, { Suspense } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { AuthenticationRequired } from "./components/AuthenticationRequired";
import { Routes } from "./configs/routes";
import LoadingScreen from "./screens/LoadingScreen";

const dynamicImport = (route) => React.lazy(() => import(`./screens/${route}`));

function App() {
  return (
    <Suspense fallback={null}>
      <Switch>
        <Route path={Routes.LOGIN} component={dynamicImport("Login")} />
        <AuthenticationRequired>
          <Route path={Routes.HOME} component={dynamicImport("Home")} />
        </AuthenticationRequired>
      </Switch>
    </Suspense>
  );
}

export default App;
