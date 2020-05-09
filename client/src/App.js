import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout } from "./interface/layout/index";
import { Home } from "./pages/Home/index";
import { Profile } from "./pages/Profile/index";
import { Map } from "./pages/PrivateZone/index";
export const App = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/coords" extact component={Map} />
        </Switch>
      </Layout>
    </Router>
  );
};
