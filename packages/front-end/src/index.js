import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
// Layouts
import App from "./App";
import Home from "./components/home/Home";
import Generators from "./components/generators/Generators";
import CreateGenerator from "./components/generators/CreateGenerator";
import SoulDetail from "./components/soulDetail/SoulDetail";
import AuctionHistory from "./components/history/AuctionHistory";

import store from "./store";

import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";

import reducers from "./redux/reducers";
import GeneratorPage from "./components/generators/GeneratorPage";
import MyActivity from "./components/myActivity/MyActivity";

const reduxStore = createStore(reducers, applyMiddleware(thunk));

// Initialize react-router-redux.
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
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
      <Route path="/create-generator" component={App}>
        <IndexRoute component={CreateGenerator} />
      </Route>
      <Route path="/soul" component={App}>
        <IndexRoute component={SoulDetail} />
      </Route>
      <Route path="/generator/:generatorAddress" component={App}>
        <IndexRoute component={GeneratorPage} />
      </Route>
      <Route path="/my-activity" component={App}>
        <IndexRoute component={MyActivity} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById("root"),
);
