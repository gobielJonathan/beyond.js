import React from "react";
import ReactDOM from "react-dom";
import { HelmetProvider } from "react-helmet-async";
import Routes from "@beyond/component/routes";
import "./index.css";
import { canUseDom } from "./utils/dom";
import { BrowserRouter } from "react-router-dom";
import { loadableReady } from "@loadable/component";

const app = (
  <HelmetProvider>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </HelmetProvider>
);

const renderer = (id) =>
  canUseDom()
    ? ReactDOM.render(app, id)
    : loadableReady(() => ReactDOM.hydrate(app, id));

renderer(document.getElementById("__beyond"));