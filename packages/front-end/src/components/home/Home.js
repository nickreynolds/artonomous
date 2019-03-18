import React, { Component } from "react";
import ArtPiece from "../artPiece/ArtPiece";
import styled from "styled-components";
import { connect } from "react-redux";
import { Artonomous, DaiToken } from "../../wrappers/contractWrappers";
import BigNumber from "bignumber.js";
import { Card } from "material-ui";
const HomeDiv = styled.div`
  display: flex;
  margin-top: 30px;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;
const AuctionDiv = styled(Card)`
  left: 10px;
  width: 400px;
`;
const ArtDiv = styled.div`
  margin-left: 10px;
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
    if (prevProps.auctionData !== this.props.auctionData) {
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

  tryBuy = async () => {
    if (BigNumber(this.state.buyPrice).isGreaterThan(BigNumber(this.props.daiUserArtonomousApprovalBalance))) {
      await DaiToken.methods
        .approve(Artonomous._address, this.state.buyPrice.toString())
        .send({ from: this.props.account });
    }

    await Artonomous.methods.buyArt(this.state.buyPrice.toString()).send({ from: this.props.account });
  };

  render() {
    const { auctionData } = this.props;
    return (
      <HomeDiv>
        <AuctionDiv>
          <p>Time Left: {this.state.timeLeft.toFixed(0)}</p>
          <ArtDiv>
            <ArtPiece auctionData={{ ...auctionData }} />
          </ArtDiv>
          <br />
        </AuctionDiv>
        <button onClick={this.tryBuy}>BUY for {(this.state.buyPrice / 1000000000000000000).toFixed(4)} DAI</button>
      </HomeDiv>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { account, auctionData, auctionLength, daiUserArtonomousApprovalBalance } = state;
  return { account, auctionData, auctionLength, daiUserArtonomousApprovalBalance };
};
export default connect(mapStateToProps)(Home);
