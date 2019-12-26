/* eslint new-cap: 0 */

import React from 'react';
import { Route, Switch } from "react-router-dom";

/* containers */
import { App } from './containers/App';

import DetermineAuth, { checkAuth, requireAuth } from './components/DetermineAuth';
import * as pages from './pages/index';

const Foo = () => <h1>Foo</h1>;
const Bar = () => <h1>Bar</h1>;

const DetermineAuthRoute = (props) => {
  const { path, exact, children } = props;
  return (
    <Route path={path} exact={exact}>
      <DetermineAuth>{ children }</DetermineAuth>
    </Route>
  );
};

const RequireAuthRoute = (props) => {
  const { path, children } = props;
  return (
    <Route path={path} exact={exact}>
      <DetermineAuth whenUnauthorized={<pages.NotFound/>}>{ children }</DetermineAuth>
    </Route>
  );
}



export default function() {
  console.log("rendering routes??");
  return (
    <App>
      <Switch>
        <DetermineAuthRoute exact path="/"><Foo /></DetermineAuthRoute>
        <DetermineAuthRoute path="/login"><pages.Login /></DetermineAuthRoute>

        <DetermineAuthRoute path="/foo"><Foo /></DetermineAuthRoute>

        <RequireAuthRoute path="/bar"><Bar /></RequireAuthRoute>

        <DetermineAuthRoute path="/*"><pages.NotFound /></DetermineAuthRoute>
      </Switch>
    </App>
  );
}
