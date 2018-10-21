import React, { Component } from "react";
import NewContractForm from "../utility/NewContractForm";
import NewContractData from "../utility/NewContractData";
import ArtPiece from "../artPiece/ArtPiece";
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
              <strong>Staking</strong>: <NewContractData contract="Artonomous" method="registry" />
            </p>
            <p>
              <strong>Piece Token</strong>: <NewContractData contract="Artonomous" method="pieceToken" />
            </p>
            <p>
              <strong>Piece Token Owner</strong>: <NewContractData contract="ArtPieceToken" method="owner" />
            </p>{" "}
            <p>
              <strong>Soul Balance</strong>:{" "}
              <NewContractData
                contract="SoulToken"
                method="balanceOf"
                methodArgs={["0xcEC56F1D4Dc439E298D5f8B6ff3Aa6be58Cd6Fdf"]}
              />
            </p>
            <p>
              <strong>Auction Length (in seconds)</strong>:{" "}
              <NewContractData contract="Artonomous" method="AUCTION_LENGTH" />
            </p>
            {auctionData && (
              <ArtPiece
                drizzle={this.props.drizzle}
                drizzleState={this.props.drizzleState}
                blockNum={auctionData.value[0]}
              />
            )}
            <NewContractForm contract="Artonomous" method="buyArt" methodArgs={{ value: "100000000000000000" }}>
              Buy Art
            </NewContractForm>
          </div>
        </div>
      </main>
    );
  }
}

export default Home;
