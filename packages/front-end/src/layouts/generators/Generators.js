import React, { Component } from "react";
import { ContractData } from "drizzle-react-components";
import NewContractForm from "../utility/NewContractForm";
class Generators extends Component {
  state = { tokenKey: null, generatorsKey: null, activeGeneratorKey: null };
  componentDidMount() {
    const tokenKey = this.props.drizzle.contracts.GeneratorRegistry.methods.getToken.cacheCall();
    this.setState({ tokenKey });
    const activeGeneratorKey = this.props.drizzle.contracts.GeneratorRegistry.methods.activeGenerator.cacheCall();
    this.setState({ activeGeneratorKey });
    //const generatorsKey = this.props.drizzle.contracts.GeneratorRegistry.methods.generators.cacheCall();
    //this.setState({ generatorsKey });
    console.log("generator state set with tokenKey: ", tokenKey);
    console.log("generator state set with activeGeneratorKey: ", activeGeneratorKey);
    //console.log("generator state set with dataKeY: ", generatorsKey);
  }
  render() {
    console.log("Generators.js props: ", this.props);
    const tokenAddr = this.props.drizzleState.contracts.GeneratorRegistry.getToken[this.state.tokenKey];
    console.log("tokenAddr: ", tokenAddr);
    const generators = this.props.drizzleState.contracts.GeneratorRegistry.generators[this.state.generatorsKey];
    console.log("generators: ", generators);
    const activeGenerator = this.props.drizzleState.contracts.GeneratorRegistry.activeGenerator[
      this.state.activeGeneratorKey
    ];
    console.log("active generator: ", activeGenerator);
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1 header">
            <h1>Generators</h1>
            SOUL Token Addr: {tokenAddr && tokenAddr.value}
            <h2>Create Generator</h2>
            <NewContractForm contract="GeneratorFactory" method="createGenerator">
              Create New Generator
            </NewContractForm>
          </div>
        </div>
      </main>
    );
  }
}

export default Generators;
