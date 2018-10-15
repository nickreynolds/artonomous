import React, { Component } from "react";

import "./App.css";
import NavBarContainer from "./layouts/navbar/NavBarContainer";
class DrizzleApp extends Component {
  render() {
    const { children } = this.props;
    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, { drizzle: this.props.drizzle, drizzleState: this.props.drizzleState }),
    );

    return (
      <div>
        <NavBarContainer drizzle={this.props.drizzle} drizzleState={this.props.drizzleState} />
        {childrenWithProps}
      </div>
    );
  }
}

export default DrizzleApp;
