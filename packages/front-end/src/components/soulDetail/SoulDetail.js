import React, { Component } from "react";
import { ContractData } from "drizzle-react-components";
import NewContractForm from "../utility/NewContractForm";
import ArtPiece from "../artPiece/ArtPiece";
class SoulDetail extends Component {
  state = { auctionkey: null };
  componentDidMount() {
    // const auctionkey = this.props.drizzle.contracts.Artonomous.methods.currentAuction.cacheCall();
    // this.setState({ auctionkey });
  }
  render() {
    console.log("soul detail");
    return (
      <div>
        Pool Balance: <ContractData contract="SoulToken" method="poolBalance" />
      </div>
    );
  }
}

export default SoulDetail;
