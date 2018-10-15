import React, { Component } from "react";
import { ContractData } from "drizzle-react-components";
import NewContractForm from "../utility/NewContractForm";
class ArtPiece extends Component {
  state = { artPieceKey: null, ownerKey: null };
  componentDidMount() {
    console.log("this.props.blockNum: ", this.props.blockNum);
    console.log("ArtPieceToken: ", this.props.drizzle.contracts.ArtPieceToken);
    const artPieceKey = this.props.drizzle.contracts.ArtPieceToken.methods.getGenerator.cacheCall(this.props.blockNum);
    this.setState({ artPieceKey });
    const ownerKey = this.props.drizzle.contracts.ArtPieceToken.methods.ownerOf.cacheCall(this.props.blockNum);
    console.log("ownerKey: ", ownerKey);
    this.setState({ ownerKey });
  }
  render() {
    console.log("ArtPiece.js - blockNum: ", this.props.blockNum);
    const auctionData = this.props.drizzleState.contracts.ArtPieceToken.getGenerator[this.state.artPieceKey];
    console.log("auctionData: ", auctionData);
    const ownerData = this.props.drizzleState.contracts.ArtPieceToken.ownerOf[this.state.ownerKey];
    console.log("ownerData: ", ownerData);
    return (
      <div>
        <p>Block Number: {this.props.blockNum}</p>
        <p>Current Owner: {ownerData && ownerData.value}</p>
        <p>Generator of Piece: {auctionData && auctionData.value}</p>
      </div>
    );
  }
}

export default ArtPiece;
