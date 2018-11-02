import React, { Component } from "react";

class Login extends Component {
  render() {
    return (
      <div>
        <button
          onClick={() => {
            window.ethereum.enable();
          }}
        >
          LOGIN
        </button>
      </div>
    );
  }
}

export default Login;
