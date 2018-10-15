import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import { Drizzle, generateStore } from "drizzle";
import { DrizzleProvider, DrizzleContext } from "drizzle-react";
// Layouts
import App from "./App";
import HomeContainer from "./layouts/home/HomeContainer";
import GeneratorsContainer from "./layouts/generators/GeneratorsContainer";
import { LoadingContainer } from "drizzle-react-components";

import store from "./store";
import drizzleOptions from "./drizzleOptions";
const drizzleStore = generateStore(drizzleOptions);
const drizzle = new Drizzle(drizzleOptions, drizzleStore);
// Initialize react-router-redux.
const history = syncHistoryWithStore(browserHistory, store);
ReactDOM.render(
  <DrizzleContext.Provider drizzle={drizzle}>
    <DrizzleProvider store={store} options={drizzleOptions}>
      <LoadingContainer>
        <Router history={history}>
          <Route path="/" component={App}>
            <IndexRoute component={HomeContainer} />
          </Route>
          <Route path="/generators" component={App}>
            <IndexRoute component={GeneratorsContainer} />
          </Route>
        </Router>
      </LoadingContainer>
    </DrizzleProvider>
  </DrizzleContext.Provider>,
  document.getElementById("root")
);
