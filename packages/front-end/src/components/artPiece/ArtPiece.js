import React, { Component } from "react";
import { ContractData } from "drizzle-react-components";
import NewContractForm from "../utility/NewContractForm";
import ArtPieceRendererContainer from "./ArtPieceRendererContainer";
import { Link } from "react-router";

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
    console.log("generator link: ", generatorLink);
    return (
      <div>
        <p>Block Number: {auctionData.blockNumber}</p>
        <p>{auctionData && (<Link to={generatorLink} >Generator of Piece: {auctionData.generator}</Link>)}</p>
        {auctionData && <ArtPieceRendererContainer auctionData={auctionData} />}
      </div>
    );
  }
}

export default ArtPiece;
