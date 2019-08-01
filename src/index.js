import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/app.scss?v=1.1.0";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import "assets/css/app.css";


import { App } from "./views/layout";
import { Provider } from 'react-redux';
import { store } from "./store/store";
import {history} from "./helper/history";


ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path="/" render={props => <App {...props} />} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
