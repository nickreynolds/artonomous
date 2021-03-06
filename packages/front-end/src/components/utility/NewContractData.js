import React, { Component } from "react";
import { DrizzleContext } from "drizzle-react";

/*
 * Create component.
 */

class NewContractData extends Component {
  constructor(props) {
    super(props);

    this.contracts = this.props.drizzle.contracts;

    // Get the contract ABI
    const abi = this.contracts[this.props.contract].abi;

    // Fetch initial value from chain and return cache key for reactive updates.
    var methodArgs = this.props.methodArgs ? this.props.methodArgs : [];
    this.dataKey = this.contracts[this.props.contract].methods[this.props.method].cacheCall(...methodArgs);
  }

  render() {
    // Contract is not yet intialized.
    if (!this.props.drizzleState.contracts[this.props.contract].initialized) {
      return <span>Initializing...</span>;
    }

    // If the cache key we received earlier isn't in the store yet; the initial value is still being fetched.
    if (!(this.dataKey in this.props.drizzleState.contracts[this.props.contract][this.props.method])) {
      return <span>Fetching...</span>;
    }

    // Show a loading spinner for future updates.
    var pendingSpinner = this.props.drizzleState.contracts[this.props.contract].synced ? "" : " 🔄";

    // Optionally hide loading spinner (EX: ERC20 token symbol).
    if (this.props.hideIndicator) {
      pendingSpinner = "";
    }

    var displayData = this.props.drizzleState.contracts[this.props.contract][this.props.method][this.dataKey].value;

    // Optionally convert to UTF8
    if (this.props.toUtf8) {
      displayData = this.context.drizzle.web3.utils.hexToUtf8(displayData);
    }

    // Optionally convert to Ascii
    if (this.props.toAscii) {
      displayData = this.context.drizzle.web3.utils.hexToAscii(displayData);
    }

    // If return value is an array
    if (typeof displayData === "array") {
      const displayListItems = displayData.map((datum, index) => {
        <li key={index}>
          {`${datum}`}
          {pendingSpinner}
        </li>;
      });

      return <ul>{displayListItems}</ul>;
    }

    // If retun value is an object
    if (typeof displayData === "object") {
      var i = 0;
      const displayObjectProps = [];

      Object.keys(displayData).forEach(key => {
        if (i != key) {
          displayObjectProps.push(
            <li key={i}>
              <strong>{key}</strong>
              {pendingSpinner}
              <br />
              {`${displayData[key]}`}
            </li>,
          );
        }

        i++;
      });

      return <ul>{displayObjectProps}</ul>;
    }

    return (
      <span>
        {`${displayData}`}
        {pendingSpinner}
      </span>
    );
  }
}

class NewContractDataContainer extends Component {
  render() {
    return (
      <DrizzleContext.Consumer>
        {drizzleContext => {
          const { drizzle, drizzleState, initialized } = drizzleContext;
          return <NewContractData {...this.props} drizzle={drizzle} drizzleState={drizzleState} />;
        }}
      </DrizzleContext.Consumer>
    );
  }
}
export default NewContractDataContainer;
