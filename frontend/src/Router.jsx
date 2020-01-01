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
import Users from "./components/Users/Users";

export const routes = [
  { id: 2, url: "/sign", label: "Sign", requireAuth: true, component: Sign },
  {
    id: 3,
    url: "/weekly",
    label: "Planning",
    requireAuth: true,
    component: WeeklyPlanning
  },
  {
    id: 4,
    url: "/profile",
    label: "Profile",
    requireAuth: true,
    component: Profile
  },
  {
    id: 5,
    url: "/users",
    label: "Users",
    requireAuth: true,
    component: Users
  }
];

function Router({ isAuthFromStore }) {
  const componentRoute = routes.map(({ id, url, requireAuth, component }) => {
    return !requireAuth ? (
      <Route exact={url === "/" && true} path={url} key={id} />
    ) : (
      <AuthRoute isAuth={isAuthFromStore} path={url} component={component} key={id} />
    );
  });
  return (
    <>
      <Header />

      <Route
        render={({ location }) => {
          return (
            <TransitionGroup>
              <CSSTransition key={location.key} timeout={450} classNames="slide">
                <Container className="mt-5">
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={Login} />
                    {componentRoute}
                    {/* 
                    <AuthRoute isAuth={isAuthFromStore} path="/sign" component={Sign} />
                    <AuthRoute isAuth={isAuthFromStore} path="/profile" component={Profile} />
                    <AuthRoute isAuth={isAuthFromStore} path="/weekly" component={WeeklyPlanning} /> */}
                  </Switch>
                </Container>
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
