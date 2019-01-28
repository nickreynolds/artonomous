import React, { Component } from "react";
import NewContractForm from "../utility/NewContractForm";
import NewContractData from "../utility/NewContractData";
import ArtPiece from "../artPiece/ArtPiece";
import styled from "styled-components";
import { connect } from "react-redux";
import { Artonomous, DaiToken } from "../../wrappers/contractWrappers";

const HomeDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

class Home extends Component {
  state = {
    timeLeft: 0,
    buyPrice: 0,
  };
  componentDidMount() {
    if (this.props.auctionData) {
      setInterval(this.getPrice, 1000);
      this.getPrice();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.auctionData != this.props.auctionData) {
      this.getPrice();
    }
  }

  getPrice = () => {
    const auctionData = this.props.auctionData;
    const auctionLength = this.props.auctionLength;
    if (auctionData && auctionLength) {
      const endTime = auctionData.endTime;
      const endDate = new Date(endTime * 1000);
      const endSeconds = endDate.getTime() / 1000;
      const nowDate = new Date();
      const nowSeconds = nowDate.getTime() / 1000;
      const secondsLeft = endSeconds - nowSeconds;
      const boundSecondsLeft = secondsLeft > 0 ? secondsLeft : 0;
      const buyPrice = Math.ceil(auctionData.startingPrice * (boundSecondsLeft / auctionLength));
      this.setState({ timeLeft: boundSecondsLeft, buyPrice });
    }
  };

  tryApprove = () => {
    DaiToken.methods
      .approve(Artonomous._address, this.state.buyPrice.toString())
      .send({ from: this.props.account })
      .then(receipt => {
        console.log("receipt: ", receipt);
      });
  };

  tryBuy = () => {
    Artonomous.methods
      .buyArt(this.state.buyPrice.toString())
      .send({ from: this.props.account })
      .then(receipt => {
        console.log("receipt:", receipt);
      });
  };

  render() {
    const { auctionData } = this.props;
    return (
      <HomeDiv>
        <p>Auction Block Number: {auctionData && auctionData.blockNumber}</p>
        <p>Time Left: {this.state.timeLeft.toFixed(0)}</p>
        <p>Buy Price: {(this.state.buyPrice / 1000000000000000000).toFixed(6)}</p>
        <ArtPiece auctionData={{ ...auctionData }} />
        <button onClick={this.tryBuy}>try buy</button>
        <button onClick={this.tryApprove}>try approve</button>
      </HomeDiv>
    );
  }
}

// <p>
// <strong>Auction Length (in seconds)</strong>:{" "}
// <NewContractData contract="Artonomous" method="AUCTION_LENGTH" />
// </p>
// <p>Auction Block Number: {auctionData && auctionData.value[0]}</p>
// <p>Time Left: {this.state.timeLeft.toFixed(0)}</p>
// <p>Buy Price: {(this.state.buyPrice / 1000000000000000000).toFixed(6)}</p>
// {auctionData &&
// auctionData.value[0] > 0 && (
//   <div>

//     <p>
//       Allowance:{" "}
//       <NewContractData
//         contract="TestDaiToken"
//         method="allowance"
//         methodArgs={[this.props.drizzleState.accounts[0], this.props.drizzle.contracts.Artonomous.address]}
//       />
//     </p>
//     <NewContractForm
//       contract="TestDaiToken"
//       method="approve"
//       methodArgs={{ from: this.props.drizzleState.accounts[0] }}
//       initialMethodArgs={[this.props.drizzle.contracts.Artonomous.address, this.state.buyPrice.toString()]}
//       hideInputs={true}
//     >
//       Approve Enough
//     </NewContractForm>
//     <NewContractForm
//       contract="Artonomous"
//       method="buyArt"
//       methodArgs={{ from: this.props.drizzleState.accounts[0] }}
//       initialMethodArgs={[this.state.buyPrice.toString()]}
//       hideInputs={true}
//     >
//       Buy Art
//     </NewContractForm>
//   </div>
// )}

// {auctionData &&
// auctionData.value[0] == 0 && (
//   <NewContractForm
//     contract="Artonomous"
//     method="startAuction"
//     methodArgs={{ from: this.props.drizzleState.accounts[0] }}
//     initialMethodArgs={["1000000000000000000", "0"]}
//     hideInputs={true}
//   >
//     Start Auction
//   </NewContractForm>
// )}

const mapStateToProps = (state, ownProps) => {
  const { account, auctionData, auctionLength } = state;
  return { account, auctionData, auctionLength };
};
export default connect(mapStateToProps)(Home);
