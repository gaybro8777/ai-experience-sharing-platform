import React from "react";
import { Switch, Route } from "react-router-dom";
import Default from "./Default";
import Page from "./Page";
import AdminLogin from "./AdminLogin";
import Usecase from "./Usecase";

export default ({ location }) => (
  <Switch>
    <Route key="default" path="/" exact>
      <Default />
    </Route>
    <Route key="page" path="/loginadmin" exact>
      <AdminLogin />
    </Route>
    <Route key="page" path="/:name">
      <Page />
    </Route>
    <Usecase />
  </Switch>
);
