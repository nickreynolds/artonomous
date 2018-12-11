import React, { Component } from "react";
import { ContractData } from "drizzle-react-components";
import NewContractForm from "../utility/NewContractForm";
import ArtPieceRendererContainer from "./ArtPieceRendererContainer";
class ArtPiece extends Component {
  state = { artPieceKey: null, ownerKey: null };
  componentDidMount() {
    const artPieceKey = this.props.drizzle.contracts.ArtPieceToken.methods.getGenerator.cacheCall(this.props.blockNum);
    this.setState({ artPieceKey });
    const ownerKey = this.props.drizzle.contracts.ArtPieceToken.methods.ownerOf.cacheCall(this.props.blockNum);
    this.setState({ ownerKey });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.blockNum !== this.props.blockNum) {
      const artPieceKey = this.props.drizzle.contracts.ArtPieceToken.methods.getGenerator.cacheCall(
        this.props.blockNum,
      );
      this.setState({ artPieceKey });
      const ownerKey = this.props.drizzle.contracts.ArtPieceToken.methods.ownerOf.cacheCall(this.props.blockNum);
      this.setState({ ownerKey });
    }
  }
  render() {
    const auctionData = this.props.drizzleState.contracts.ArtPieceToken.getGenerator[this.state.artPieceKey];
    const ownerData = this.props.drizzleState.contracts.ArtPieceToken.ownerOf[this.state.ownerKey];
    return (
      <div>
        <p>Block Number: {this.props.blockNum}</p>
        <p>Current Owner: {ownerData && ownerData.value}</p>
        <p>Generator of Piece: {auctionData && auctionData.value}</p>
        {auctionData && (
          <ArtPieceRendererContainer
            drizzle={this.props.drizzle}
            drizzleState={this.props.drizzleState}
            generator={auctionData.value}
            blockNum={this.props.blockNum}
          />
        )}
      </div>
    );
  }
}

export default ArtPiece;
