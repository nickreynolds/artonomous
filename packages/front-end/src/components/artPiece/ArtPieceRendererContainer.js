import React, { Component } from "react";
import { ContractData } from "drizzle-react-components";
import NewContractForm from "../utility/NewContractForm";
import store from "../../store";
import Generator from "../../../contracts/Generator";
import ArtPieceRenderer from "./ArtPieceRenderer";
import { getGeneratorCode } from "../../redux/actionCreators/generatorActions";
import { connect } from "react-redux";
class ArtPieceRendererContainer extends Component {
  state = { generatorUri: null, generatorName: null, hash: null };

  componentDidMount() {
    this.update();
    this.onUpdate();
  }

  componentWillUpdate(prevProps) {
    if (prevProps.generator != this.props.generator || this.props.drizzle != prevProps.drizzle) {
      this.update();
    }
  }

  update() {
    const generatorName = this.props.generator;
    this.setState({ generatorName });
    const contract = new this.props.drizzle.web3.eth.Contract(Generator.abi, this.props.generator);

    console.log("UPDATE GET GENERATOR: ", contract);
    this.props.dispatch(getGeneratorCode(contract));
  }

  onUpdate() {
    const level = this;
    this.setState({ hash: this.props.hash });
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
    if (this.state.generatorName && this.props.uri && this.state.hash) {
      return <ArtPieceRenderer url={this.props.uri} hash={this.state.hash} code={this.props.code} />;
    }
    return <div>loading</div>;
  }
}
const mapStateToProps = (state, ownProps) => {
  return { code: state.generatorCode.get(ownProps.generator), uri: state.generatorUri.get(ownProps.generator) };
};
export default connect(mapStateToProps)(ArtPieceRendererContainer);
