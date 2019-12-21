import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { connect } from "react-redux";
import { Container } from "reactstrap";

import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import Sign from "./components/Sign/Sign";
import Profile from "./components/Profile/Profile";
import WeeklyPlanning from "./components/Week/WeeklyPlanning";
import Home from "./components/Home/Home";

export const routes = [
  { id: 1, url: "/", label: "Home", requireAuth: false },
  { id: 2, url: "/sign", label: "Sign", requireAuth: true },
  { id: 4, url: "/weekly", label: "Planning", requireAuth: true },
  { id: 3, url: "/profile", label: "Profile", requireAuth: true }
];

function Router({ isAuthFromStore }) {
  return (
    <>
      <Header />
      <Container className="mt-5">
        <Route
          render={({ location }) => {
            return (
              <TransitionGroup>
                <CSSTransition key={location.key} timeout={450} classNames="slide">
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={Login} />
                    <AuthRoute isAuth={isAuthFromStore} path="/sign" component={Sign} />
                    <AuthRoute isAuth={isAuthFromStore} path="/profile" component={Profile} />
                    <AuthRoute isAuth={isAuthFromStore} path="/weekly" component={WeeklyPlanning} />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            );
          }}
        />
      </Container>
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
