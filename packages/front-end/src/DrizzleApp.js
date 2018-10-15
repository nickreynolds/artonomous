import React, { Component } from "react";

import "./App.css";
import NavBarContainer from "./layouts/navbar/NavBarContainer";
class DrizzleApp extends Component {
  render() {
    return (
      <div>
        <NavBarContainer drizzle={this.props.drizzle} drizzleState={this.props.drizzleState} />
        {this.props.children}
      </div>
    );
  }
}

export default DrizzleApp;
