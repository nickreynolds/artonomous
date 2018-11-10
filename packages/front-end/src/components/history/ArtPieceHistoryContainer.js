import React, { Component } from "react";
import ArtPiece from "../artPiece/ArtPiece";
import styled from "styled-components";

const HistoryDiv = styled.div`
  border: 1px solid black;
`;
class ArtPieceHistoryContainer extends Component {
  render() {
    return (
      <HistoryDiv>
        Bought for: {this.props.event.returnValues[2]} ETH <br />
        <ArtPiece {...this.props} blockNum={this.props.event.returnValues[1]} />
      </HistoryDiv>
    );
  }
}

export default ArtPieceHistoryContainer;
