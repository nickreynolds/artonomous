import React, { Component } from "react";
import { ContractData } from "drizzle-react-components";
import NewContractForm from "../utility/NewContractForm";
import ArtPieceRendererContainer from "./ArtPieceRendererContainer";
import { Link } from "react-router";
import { connect } from "react-redux";

class ArtPiece extends Component {
  componentDidMount() {}
  componentDidUpdate(prevProps) {
    if (prevProps.blockNum !== this.props.blockNum) {
    }
  }
  render() {
    const { auctionData } = this.props;
    let generatorLink = "/";
    if (auctionData) {
      generatorLink = "/generator/" + auctionData.generator;
    }
    return (
      <div>
        <p>{auctionData && (<Link to={generatorLink} >{this.props.name} - {auctionData.blockNumber}</Link>)}</p>
        {auctionData && <ArtPieceRendererContainer auctionData={auctionData} />}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { generatorNames } = state;
  return {
    name: generatorNames.get(ownProps.auctionData.generator),
    ...ownProps
  };
};

export default connect(mapStateToProps)(ArtPiece);

