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
  );
}

export default App;
