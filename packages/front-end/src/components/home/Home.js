import React, { Component } from "react";
import NewContractForm from "../utility/NewContractForm";
import NewContractData from "../utility/NewContractData";
import ArtPiece from "../artPiece/ArtPiece";
import styled from "styled-components";

const HomeDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

class Home extends Component {
  state = {
    auctionkey: null,
    auctionLengthKey: null,
    timeLeft: 0,
    buyPrice: 0,
  };
  componentDidMount() {
    const auctionkey = this.props.drizzle.contracts.Artonomous.methods.currentAuction.cacheCall();
    const auctionLengthKey = this.props.drizzle.contracts.Artonomous.methods.AUCTION_LENGTH.cacheCall();
    this.setState({ auctionkey, auctionLengthKey });
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
      const buyPrice = Math.ceil(auctionData.value.startingPrice * (boundSecondsLeft / auctionLength.value));
      this.setState({ timeLeft: boundSecondsLeft, buyPrice });
    }
  };

  render() {
    const auctionData = this.props.drizzleState.contracts.Artonomous.currentAuction[this.state.auctionkey];
    return (
      <HomeDiv>
        <div>
          <p>
            <strong>Auction Length (in seconds)</strong>:{" "}
            <NewContractData contract="Artonomous" method="AUCTION_LENGTH" />
          </p>
          <p>Auction Block Number: {auctionData && auctionData.value[0]}</p>
          <p>Time Left: {this.state.timeLeft.toFixed(0)}</p>
          <p>Buy Price: {(this.state.buyPrice / 1000000000000000000).toFixed(6)}</p>
          {auctionData && (
            <ArtPiece
              drizzle={this.props.drizzle}
              drizzleState={this.props.drizzleState}
              blockNum={auctionData.value[0]}
            />
          )}
          <p>
            Allowance:{" "}
            <NewContractData
              contract="TestDaiToken"
              method="allowance"
              methodArgs={[this.props.drizzleState.accounts[0], this.props.drizzle.contracts.Artonomous.address]}
            />
          </p>
          <NewContractForm
            contract="TestDaiToken"
            method="approve"
            methodArgs={{ from: this.props.drizzleState.accounts[0] }}
            initialMethodArgs={[this.props.drizzle.contracts.Artonomous.address, this.state.buyPrice.toString()]}
            hideInputs={true}
          >
            Approve Enough
          </NewContractForm>
          <NewContractForm
            contract="Artonomous"
            method="buyArt"
            methodArgs={{ from: this.props.drizzleState.accounts[0] }}
            initialMethodArgs={[this.state.buyPrice.toString()]}
            hideInputs={true}
          >
            Buy Art
          </NewContractForm>
        </div>
      </HomeDiv>
    );
  }
}

export default Home;
