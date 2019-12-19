import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import Sign from "./components/Sign/Sign";
import { TransitionGroup, CSSTransition } from "react-transition-group";

function Router() {
  return (
    <>
      <Header />
      <Route
        render={({ location }) => {
          return (
            <TransitionGroup>
              <CSSTransition key={location.key} timeout={450} classNames="slide">
                <Switch>
                  <Route exact path="/" component={Login} />
                  <AuthRoute isAuth={true} path="/login" component={Login} />
                  <AuthRoute isAuth={true} path="/sign" component={Sign} />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          );
        }}
      />
    </>
  );
}

function AuthRoute({ isAuth, component: Component, ...rest }) {
  return isAuth ? (
    <Route {...rest} render={props => <Component {...props} />} />
  ) : (
    <Redirect to="/" />
  );
}

export default Router;
