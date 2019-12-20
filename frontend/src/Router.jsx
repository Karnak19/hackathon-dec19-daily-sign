import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { connect } from "react-redux";

import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import Sign from "./components/Sign/Sign";
import Profile from "./components/Profile/Profile";
import Recap from "./components/Recap/Recap";

function Router({ isAuthFromStore }) {
  return (
    <>
      <Header />
      <Route
        render={({ location }) => {
          return (
            <TransitionGroup>
              <CSSTransition
                key={location.key}
                timeout={450}
                classNames="slide"
              >
                <Switch>
                  <Route exact path="/" component={Login} />
                  <Route path="/login" component={Login} />
                  <AuthRoute
                    isAuth={isAuthFromStore}
                    path="/sign"
                    component={Sign}
                  />
                  <AuthRoute
                    isAuth={isAuthFromStore}
                    path="/recap"
                    component={Recap}
                  />
                  <AuthRoute
                    isAuth={isAuthFromStore}
                    path="/profile"
                    component={Profile}
                  />
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

const mapStateToProps = state => {
  return {
    isAuthFromStore: state.isAuth
  };
};

export default connect(mapStateToProps)(Router);
