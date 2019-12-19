<<<<<<< HEAD
import React from 'react';
import Router from './component/Router';

function App() {
  return (
    <Router />
=======
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import "./App.css";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import Sign from "./components/Sign/Sign";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <Switch>
          <Route exact path="/" component={Login} />
          <AuthRoute isAuth={true} path="/login" component={Login} />
          <AuthRoute isAuth={true} path="/sign" component={Sign} />
        </Switch>
      </div>
    </Router>
  );
}

function AuthRoute({ isAuth, component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        if (!isAuth) {
          return <Redirect to="/" />;
        } else {
          return <Component {...props} />;
        }
      }}
    />
>>>>>>> 4f67306c8fae76e3fc6ad53e8a83d622e7d2aea6
  );
}

export default App;
