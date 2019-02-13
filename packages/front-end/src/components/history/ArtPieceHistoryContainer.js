import React, { Component } from "react";
import ArtPiece from "../artPiece/ArtPiece";
import styled from "styled-components";
import { Card } from "material-ui";
import BigNumber from "bignumber.js";
import { FormattedCurrency } from "../utility/FormattedCurrency";

const HistoryDiv = styled(Card)`
left: 10px;
width: 400px;
height: 500px;
`;

const ArtDiv = styled.div`
margin-left: 10px;
margin-top: 10px;
`;

const BoughtForDiv = styled.div`
display: flex;
`;

class ArtPieceHistoryContainer extends Component {
  render() {
    // console.log("this.props: ", this.props);
    return (
      <HistoryDiv>
        <ArtDiv>
          <BoughtForDiv>
          Bought for: {" "}<FormattedCurrency value={this.props.auctionData.returnValues.price} type={"DAI"}/>
          </BoughtForDiv>
          <br />
          <ArtPiece {...this.props} auctionData={this.props.auctionData.returnValues} />
        </ArtDiv>
      </HistoryDiv>
    );
  }
}

export default ArtPieceHistoryContainer;
