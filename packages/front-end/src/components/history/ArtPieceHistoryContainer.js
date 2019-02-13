import React, { Component } from "react";
import ArtPiece from "../artPiece/ArtPiece";
import styled from "styled-components";
import { Card } from "material-ui";

const HistoryDiv = styled(Card)`
left: 10px;
width: 400px;
height: 500px;
`;

class ArtPieceHistoryContainer extends Component {
  render() {
    // console.log("this.props: ", this.props);
    return (
      <HistoryDiv>
        Bought for: {this.props.auctionData.returnValues.price} DAI <br />
        <ArtPiece {...this.props} auctionData={this.props.auctionData.returnValues} />
      </HistoryDiv>
    );
  }
}

export default ArtPieceHistoryContainer;
