import React, { Component } from "react";
import ArtPiece from "../artPiece/ArtPiece";
class ArtPieceHistoryContainer extends Component {
  render() {
    return (
      <div>
        Bought for: {this.props.event.returnValues[2]} ETH <br />
        <ArtPiece {...this.props} blockNum={this.props.event.returnValues[1]} />
      </div>
    );
  }
}

export default ArtPieceHistoryContainer;
