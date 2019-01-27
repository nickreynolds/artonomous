import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import { Drizzle, generateStore } from "drizzle";
import { DrizzleProvider, DrizzleContext } from "drizzle-react";
// Layouts
import App from "./App";
import Home from "./components/home/Home";
import Generators from "./components/generators/Generators";
import CreateGenerator from "./components/generators/CreateGenerator";
import SoulDetail from "./components/soulDetail/SoulDetail";
import { LoadingContainer } from "drizzle-react-components";
import AuctionHistory from "./components/history/AuctionHistory";

import store from "./store";
import drizzleOptions from "./drizzleOptions";

import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";

import reducers from "./redux/reducers";

const reduxStore = createStore(reducers, applyMiddleware(thunk));

const drizzleStore = generateStore(drizzleOptions);
const drizzle = new Drizzle(drizzleOptions, drizzleStore);
// Initialize react-router-redux.
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <DrizzleContext.Provider drizzle={drizzle}>
    <Provider store={reduxStore}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
        </Route>
        <Route path="/generators" component={App}>
          <IndexRoute component={Generators} />
        </Route>
        <Route path="/history" component={App}>
          <IndexRoute component={AuctionHistory} />
        </Route>
        <Route path="/createGenerator" component={App}>
          <IndexRoute component={CreateGenerator} />
        </Route>
        <Route path="/soul" component={App}>
          <IndexRoute component={SoulDetail} />
        </Route>
      </Router>
    </Provider>
  </DrizzleContext.Provider>,
  document.getElementById("root"),
);
