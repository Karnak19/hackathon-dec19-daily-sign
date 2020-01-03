import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { toast } from "react-toastify";

import App from "./App";
import { API_URL } from "./env";
import { store } from "./store/store";
import "./index.scss";

import "bootswatch/dist/flatly/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const client = new ApolloClient({
  uri: API_URL + "/graphql"
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
