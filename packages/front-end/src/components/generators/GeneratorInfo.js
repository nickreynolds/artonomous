import React, { Component } from "react";
import { ContractData } from "drizzle-react-components";
import NewContractForm from "../utility/NewContractForm";
import store from "../../store";
import Generator from "../../../contracts/Generator";
import * as fsapi from "../../fsapi";

class GeneratorInfo extends Component {
  state = { generatorUri: null, generatorName: null, hash: null, code: null };
  componentDidMount() {
    const generatorName = this.props.generator;
    this.setState({ generatorName });
    const contract = new this.props.drizzle.web3.eth.Contract(Generator.abi, this.props.generator);
    const level = this;

    // HACK because can't figure out the drizzle stuff
    contract.methods.sourceUri().call({}, function(error, result) {
      if (result) {
        level.setState({ generatorUri: result });

        fsapi.getTextFileFromPath(result.split("/")[0]).then(code => {
          level.setState({ code });
        });
      }
    });
  }

  render() {
    if (this.state.generatorName && this.state.generatorUri && this.state.code) {
      return (
        <div>
          <code>{this.state.code}</code>
        </div>
      );
    }
    return <div>loading</div>;
  }
}

export default GeneratorInfo;
