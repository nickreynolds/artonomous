import React, { Component } from "react";
import { ContractData } from "drizzle-react-components";
import NewContractForm from "../utility/NewContractForm";
import store from "../../store";
import Generator from "../../../contracts/Generator";
import ArtPieceRenderer from "./ArtPieceRenderer";
class ArtPieceRendererContainer extends Component {
  state = { generatorUri: null, generatorName: null, hash: null };
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
    this.setState({ hash: this.props.hash });
    this.onUpdate();
  }
  onUpdate() {
    const level = this;
    if (!this.props.hash) {
      this.props.drizzle.web3.eth.getBlock(this.props.blockNum, function(error, result) {
        if (result) {
          level.setState({ hash: result.hash });
        }
      });
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.hash && this.props.hash != prevProps.hash) {
      this.onUpdate();
    }
  }

  render() {
    if (this.state.generatorName && this.state.generatorUri && this.state.hash) {
      return <ArtPieceRenderer url={this.state.generatorUri} hash={this.state.hash} />;
    }
    return <div>loading</div>;
  }
}

export default ArtPieceRendererContainer;
