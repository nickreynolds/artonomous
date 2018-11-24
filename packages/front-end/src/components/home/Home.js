import React, { Component } from "react";
import NewContractForm from "../utility/NewContractForm";
import NewContractData from "../utility/NewContractData";
import ArtPiece from "../artPiece/ArtPiece";
class Home extends Component {
  state = {
    auctionkey: null,
    auctionLengthKey: null,
    fakeAuctionkey: null,
    fakeAuctionKey2: null,
    timeLeft: 0,
    buyPrice: 0,
  };
  componentDidMount() {
    console.log("Artonomous]: ", this.props.drizzle.contracts.Artonomous);
    const auctionkey = this.props.drizzle.contracts.Artonomous.methods.currentAuction.cacheCall();
    const fakeAuctionKey = this.props.drizzle.contracts.Artonomous.methods.currentAuctionBlockNumber.cacheCall();
    const fakeAuctionKey2 = this.props.drizzle.contracts.Artonomous.methods.getCurrentAuctionBlockNumber.cacheCall();
    const auctionLengthKey = this.props.drizzle.contracts.Artonomous.methods.AUCTION_LENGTH.cacheCall();
    this.setState({ auctionkey, auctionLengthKey, fakeAuctionKey, fakeAuctionKey2 });
    setInterval(this.getPrice, 1000);
    this.getPrice();
  }

  getPrice = () => {
    const auctionData = this.props.drizzleState.contracts.Artonomous.currentAuction[this.state.auctionkey];
    const auctionLength = this.props.drizzleState.contracts.Artonomous.AUCTION_LENGTH[this.state.auctionLengthKey];
    if (auctionData && auctionData.value && auctionLength && auctionLength.value) {
      const endTime = auctionData.value.endTime;
      const endDate = new Date(endTime * 1000);
      const endSeconds = endDate.getTime() / 1000;
      const nowDate = new Date();
      const nowSeconds = nowDate.getTime() / 1000;
      const secondsLeft = endSeconds - nowSeconds;
      const boundSecondsLeft = secondsLeft > 0 ? secondsLeft : 0;
      const buyPrice = auctionData.value.startingPrice * (boundSecondsLeft / auctionLength.value);
      this.setState({ timeLeft: boundSecondsLeft, buyPrice });
    }
  };

  render() {
    console.log("Artonomous State: ", this.props.drizzleState.contracts.Artonomous);
    const auctionData = this.props.drizzleState.contracts.Artonomous.currentAuction[this.state.auctionkey];
    const fakeAuctionData = this.props.drizzleState.contracts.Artonomous.currentAuctionBlockNumber[
      this.state.fakeAuctionKey
    ];
    const fakeAuctionData2 = this.props.drizzleState.contracts.Artonomous.getCurrentAuctionBlockNumber[
      this.state.fakeAuctionKey2
    ];
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1 header">
            <h1>Artonomous</h1>
          </div>

          <div className="pure-u-1-1">
            <p>
              <strong>Auction Length (in seconds)</strong>:{" "}
              <NewContractData contract="Artonomous" method="AUCTION_LENGTH" />
            </p>
            <p>Fake data: {fakeAuctionData && fakeAuctionData.value}</p>
            <p>Fake data2: {fakeAuctionData2 && fakeAuctionData2.value}</p>
            <p>Time Left: {this.state.timeLeft.toFixed(0)}</p>
            <p>Buy Price: {(this.state.buyPrice / 1000000000000000000).toFixed(6)}</p>
            {auctionData && (
              <ArtPiece
                drizzle={this.props.drizzle}
                drizzleState={this.props.drizzleState}
                blockNum={auctionData.value[0]}
              />
            )}
            <NewContractForm contract="Artonomous" method="buyArt" methodArgs={{ value: this.state.buyPrice }}>
              Buy Art
            </NewContractForm>
          </div>
        </div>
      </main>
    );
  }
}

export default Home;
