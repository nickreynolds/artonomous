import React, { Component } from "react";
import { ContractData } from "drizzle-react-components";
import NewContractForm from "../utility/NewContractForm";
import store from "../../store";
import Generator from "../../../contracts/Generator";
import ArtPieceRenderer from "./ArtPieceRenderer";
import { getGeneratorCode } from "../../redux/actionCreators/generatorActions";
import { connect } from "react-redux";
import { getWeb3 } from "../../util/web3/getWeb3";

class ArtPieceRendererContainer extends Component {
  state = { generatorUri: null, generatorName: null, hash: null };

  componentDidMount() {
    if (this.props.auctionData) {
      this.update();
      this.onUpdate();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.auctionData != this.props.auctionData) {
      this.update();
      this.onUpdate();
    }
  }

  update() {
    const generatorName = this.props.auctionData.generator;
    this.setState({ generatorName });

    this.props.dispatch(getGeneratorCode(this.props.auctionData.generator));
  }

  onUpdate() {
    // const level = this;
    // this.setState({ hash: this.props.hash });
    // if (!this.props.hash) {
    //   console.log("go get hash");
    //   getWeb3().eth.getBlock(this.props.auctionData.blockNumber, function(error, result) {
    //     console.log("result: ", result);
    //     console.log("erro: ", error);
    //     if (result) {
    //       console.log("set hash");
    //       level.setState({ hash: result.hash });
    //     }
    //   });
    // }
    this.setState({ hash: "0x12341234123412341234123412341234123412341234414144" });
  }

  render() {
    // console.log("this.state.hash: ", this.state.hash);
    if (this.state.generatorName && this.props.uri && this.state.hash) {
      return <ArtPieceRenderer url={this.props.uri} hash={this.state.hash} code={this.props.code} />;
    }
    return <div>loading</div>;
  }
}
const mapStateToProps = (state, ownProps) => {
  const { generatorCode, generatorUri } = state;
  return {
    auctionData: { ...ownProps.auctionData },
    code: generatorCode.get(ownProps.auctionData.generator),
    uri: generatorUri.get(ownProps.auctionData.generator),
  };
};
export default connect(mapStateToProps)(ArtPieceRendererContainer);
