import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter, Route } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

import App from "./App";
import { reducer } from "./reducers/reducer";

import "bootswatch/dist/darkly/bootstrap.min.css";
import "./index.scss";

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql"
});

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Route path="/" component={App} />
      </BrowserRouter>
    </ApolloProvider>
  </Provider>,
  document.getElementById("root")
);
