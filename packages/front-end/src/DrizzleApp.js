import React, { Component } from "react";

import NavBar from "./components/navbar/NavBar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
class DrizzleApp extends Component {
  render() {
    const { children } = this.props;
    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, { drizzle: this.props.drizzle, drizzleState: this.props.drizzleState }),
    );

    return (
      <div>
        <MuiThemeProvider>
          <NavBar drizzle={this.props.drizzle} drizzleState={this.props.drizzleState} />
          {childrenWithProps}
        </MuiThemeProvider>
      </div>
    );
  }
}

export default DrizzleApp;
