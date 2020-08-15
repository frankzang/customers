import React, { Suspense } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { AuthenticationRequired } from "./components/AuthenticationRequired";
import { Routes } from "./configs/routes";
import Loading from "./screens/Loading";

const dynamicImport = (route) => React.lazy(() => import(`./screens/${route}`));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route path={Routes.LOGIN} component={dynamicImport("Login")} />
        <AuthenticationRequired>
          <Route exact path={Routes.HOME} component={dynamicImport("Home")} />
          <Route
            path={`${Routes.CITY}/:city`}
            component={dynamicImport("City")}
          />
        </AuthenticationRequired>
      </Switch>
    </Suspense>
  );
}

export default App;
