import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter, Route } from "react-router-dom";

import App from "./App";

import "bootswatch/dist/journal/bootstrap.min.css";
import "./index.scss";

const client = new ApolloClient({
  uri: "http://localhost:8000"
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Route path="/" component={App} />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);
