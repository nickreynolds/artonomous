import React, { Component } from "react";

import "./App.css";
import NavBar from "./layouts/navbar/NavBar";
class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        {this.props.children}
      </div>
    );
  }
}

export default App;
