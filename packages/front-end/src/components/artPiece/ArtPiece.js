import React, { Component } from "react";
import { ContractData } from "drizzle-react-components";
import NewContractForm from "../utility/NewContractForm";
import ArtPieceRendererContainer from "./ArtPieceRendererContainer";
class ArtPiece extends Component {
  componentDidMount() {}
  componentDidUpdate(prevProps) {
    if (prevProps.blockNum !== this.props.blockNum) {
    }
  }
  render() {
    const { auctionData } = this.props;
    return (
      <div>
        <p>Block Number: {auctionData.blockNumber}</p>
        <p>Generator of Piece: {auctionData && auctionData.generator}</p>
        {auctionData && <ArtPieceRendererContainer auctionData={auctionData} />}
      </div>
    );
  }
}

export default ArtPiece;
