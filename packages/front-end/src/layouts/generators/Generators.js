import React, { Component } from "react";
import { ContractData } from "drizzle-react-components";
import NewContractForm from "../utility/NewContractForm";
class Generators extends Component {
  render() {
    console.log("Generators.js props: ", this.props);
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1 header">
            <h1>Generators</h1>
            <ContractData contract="GeneratorRegistry" method="getToken" />
          </div>
        </div>
      </main>
    );
  }
}

export default Generators;
