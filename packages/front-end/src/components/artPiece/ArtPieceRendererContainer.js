import React, { Component } from "react";
import { ContractData } from "drizzle-react-components";
import NewContractForm from "../utility/NewContractForm";
import store from "../../store";
import Generator from "../../../contracts/Generator";
import ArtPieceRenderer from "./ArtPieceRenderer";
class ArtPieceRendererContainer extends Component {
  state = { generatorUri: null, generatorName: null };
  componentDidMount() {
    const generatorName = this.props.generator;
    this.setState({ generatorName });
    const contract = new this.props.drizzle.web3.eth.Contract(Generator.abi, this.props.generator);
    const level = this;

    // HACK because can't figure out the drizzle stuff
    contract.methods.sourceUri().call({}, function(error, result) {
      if (result) {
        level.setState({ generatorUri: result });
      }
    });
    // console.log("contract: ", contract);
    // const contractConfig = {
    //   contractName: generatorName,
    //   web3Contract: contract,
    // };
    // console.log("contractConfig: ", contractConfig);
    // const events = [];
    // const drizzle = this.props.drizzle;
    // const web3 = this.props.drizzle.web3;
    // store.dispatch({ type: "ADD_CONTRACT", drizzle, contractConfig, events, web3 });
    // console.log("this.props.drizzle: ", this.props.drizzle);
    // console.log("this.props.drizzle.contracts: ", this.props.drizzle.contracts);
    // console.log("this.props.drizzle.contracts[generatorName]: ", this.props.drizzle.contracts[generatorName]);
    // console.log(
    //   "this.props.drizzle.contracts[generatorName].methods: ",
    //   this.props.drizzle.contracts[generatorName].methods,
    // );
    // console.log(
    //   "this.props.drizzle.contracts[generatorName].methods.sourceUri: ",
    //   this.props.drizzle.contracts[generatorName].methods.sourceUri,
    // );
    //       const generatorUriKey = this.props.drizzle.contracts[this.state.generatorName].methods.sourceUri.cacheCall();
    //       this.setState({ generatorUriKey });
  }

  render() {
    if (this.state.generatorName && this.state.generatorUri) {
      return <ArtPieceRenderer url={this.state.generatorUri} />;
    }
    return <div>loading</div>;
  }
}

export default ArtPieceRendererContainer;
