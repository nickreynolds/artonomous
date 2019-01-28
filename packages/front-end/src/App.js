import React, { Component } from "react";

import NavBar from "./components/navbar/NavBar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
class App extends Component {
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <NavBar />
          {this.props.children}
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
