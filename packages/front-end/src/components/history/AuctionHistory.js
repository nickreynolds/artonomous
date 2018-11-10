import React, { Component } from "react";
import HistoryList from "./HistoryList";

class AuctionHistory extends Component {
  state = {};

  render() {
    const events = this.props.drizzleState.contracts.Artonomous.events.filter(
      event => event.event === "ArtonomousArtBought",
    );
    return (
      <div>
        <h1>History</h1>
        {events && <HistoryList {...this.props} events={events} />}
      </div>
    );
  }
}

export default AuctionHistory;
