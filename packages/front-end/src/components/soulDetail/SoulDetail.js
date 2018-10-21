import React, { Component } from "react";
import NewContractData from "../utility/NewContractData";
import ArtPiece from "../artPiece/ArtPiece";
class SoulDetail extends Component {
  state = { auctionkey: null };

  render() {
    console.log("soul detail");
    return (
      <div>
        Pool Balance: <NewContractData contract="SoulToken" method="poolBalance" />
      </div>
    );
  }
}

export default SoulDetail;
