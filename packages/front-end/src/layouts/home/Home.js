import React, { Component } from "react";
import { ContractData } from "drizzle-react-components";
import NewContractForm from "../utility/NewContractForm";
import ArtPiece from "./ArtPiece";
class Home extends Component {
  state = { auctionkey: null };
  componentDidMount() {
    const auctionkey = this.props.drizzle.contracts.Artonomous.methods.currentAuction.cacheCall();
    this.setState({ auctionkey });
  }
  render() {
    console.log("Home.js");
    const auctionData = this.props.drizzleState.contracts.Artonomous.currentAuction[this.state.auctionkey];
    console.log("auctionData: ", auctionData);
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1 header">
            <h1>Artonomous</h1>
          </div>

          <div className="pure-u-1-1">
            <p>
              <strong>Staking</strong>: <ContractData contract="Artonomous" method="registry" />
            </p>
            <p>
              <strong>Piece Token</strong>: <ContractData contract="Artonomous" method="pieceToken" />
            </p>
            <p>
              <strong>Beneficiary</strong>: <ContractData contract="Artonomous" method="beneficiary" />
            </p>
            <p>
              <strong>Auction Length (in seconds)</strong>:{" "}
              <ContractData contract="Artonomous" method="AUCTION_LENGTH" />
            </p>
            {auctionData && (
              <ArtPiece
                drizzle={this.props.drizzle}
                drizzleState={this.props.drizzleState}
                blockNum={auctionData.value[0]}
              />
            )}
            <NewContractForm contract="Artonomous" method="buyArt" methodArgs={{ value: "1000000000000000" }}>
              Buy Art
            </NewContractForm>
          </div>
        </div>
      </main>
    );
  }
}

export default Home;
