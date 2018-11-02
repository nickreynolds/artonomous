import React, { Component } from "react";
import HistoryList from "./HistoryList";

class AuctionHistory extends Component {
  state = {};
  componentDidMount() {
    console.log("this.props.drizzleState.contracts.Artonomous: ", this.props.drizzleState.contracts.Artonomous);
    console.log("this.props.drizzle.contracts.Artonomous: ", this.props.drizzle.contracts.Artonomous);
  }

  render() {
    const events = this.props.drizzleState.contracts.Artonomous.events.filter(
      event => event.event === "ArtonomousArtBought",
    );
    console.log("filtered events: ", events);
    return (
      <div>
        <h1>History</h1>
        {events && <HistoryList {...this.props} events={events} />}
      </div>
    );
  }
}

export default AuctionHistory;
