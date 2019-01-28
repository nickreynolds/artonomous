import React, { Component } from "react";
import HistoryList from "./HistoryList";
import { connect } from "react-redux";
class AuctionHistory extends Component {
  state = {};

  render() {
    return (
      <div>
        <h1>History</h1>
        {this.props.historicalAuctionIDs && (
          <HistoryList
            {...this.props}
            auctionIDs={this.props.historicalAuctionIDs}
            auctions={this.props.historicalAuctions}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { historicalAuctionIDs, historicalAuctions } = state;
  return { historicalAuctionIDs, historicalAuctions };
};
export default connect(mapStateToProps)(AuctionHistory);
