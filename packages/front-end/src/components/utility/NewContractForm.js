import React, { Component } from "react";
import { DrizzleContext } from "drizzle-react";

/*
 * Create component.
 */

class NewContractForm extends Component {
  constructor(props, context) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.methodArgs = this.props.methodArgs ? this.props.methodArgs : [];
    this.contracts = this.props.drizzle.contracts;

    // Get the contract ABI
    const abi = this.contracts[this.props.contract].abi;

    // Fetch methods arguments and index
    this.accountIndex = this.props.accountIndex ? this.props.accountIndex : [];

    this.inputs = [];
    var initialState = {};

    // Iterate over abi for correct function.
    for (var i = 0; i < abi.length; i++) {
      if (abi[i].name === this.props.method) {
        this.inputs = abi[i].inputs;

        for (var i = 0; i < this.inputs.length; i++) {
          initialState[this.inputs[i].name] = this.props.initialMethodArgs[i];
        }

        break;
      }
    }

    this.state = initialState;
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props && this.props.methodArgs) {
      this.methodArgs = this.props.methodArgs;
      // Get the contract ABI
      const abi = this.contracts[this.props.contract].abi;

      // Fetch methods arguments and index
      this.accountIndex = this.props.accountIndex ? this.props.accountIndex : [];

      this.inputs = [];
      var initialState = {};

      // Iterate over abi for correct function.
      for (var i = 0; i < abi.length; i++) {
        if (abi[i].name === this.props.method) {
          this.inputs = abi[i].inputs;

          for (var i = 0; i < this.inputs.length; i++) {
            initialState[this.inputs[i].name] = this.props.initialMethodArgs[i];
          }

          break;
        }
      }

      this.state = initialState;
    }
  }

  handleSubmit() {
    // Get arguments for method and put them into an object
    var args = new Object();
    if (this.methodArgs != null) {
      args = this.methodArgs;
    }
    args.from = this.props.drizzleState.accounts[this.props.accountIndex || 0];
    this.contracts[this.props.contract].methods[this.props.method].cacheSend(...Object.values(this.state), args);
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  translateType(type) {
    switch (true) {
      case /^uint/.test(type):
        return "number";
      case /^string/.test(type) || /^bytes/.test(type):
        return "text";
      case /^bool/.test(type):
        return "checkbox";
      default:
        return "text";
    }
  }

  render() {
    return (
      <span>
        {!this.props.hideInputs &&
          this.inputs &&
          this.inputs.map((input, index) => {
            var inputType = this.translateType(input.type);
            var inputLabel = this.props.labels ? this.props.labels[index] : input.name;
            // check if input type is struct and if so loop out struct fields as well
            return (
              <input
                key={input.name}
                type={inputType}
                name={input.name}
                value={this.state[input.name]}
                placeholder={inputLabel}
                onChange={this.handleInputChange}
              />
            );
          })}
        <button key="submit" width="100px" type="button" onClick={this.handleSubmit}>
          {this.props.children}
        </button>
      </span>
    );
  }
}

class NewContractFormContainer extends Component {
  render() {
    return (
      <DrizzleContext.Consumer>
        {drizzleContext => {
          const { drizzle, drizzleState, initialized } = drizzleContext;
          return <NewContractForm {...this.props} drizzle={drizzle} drizzleState={drizzleState} />;
        }}
      </DrizzleContext.Consumer>
    );
  }
}
export default NewContractFormContainer;
