import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import GridList from "material-ui/GridList";
import GridListTile from "material-ui/GridList/GridTile";
import ArtPieceHistoryContainer from "./ArtPieceHistoryContainer";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    width: 1500,
  },
  gridList: {
    width: 1500,
  },
  subheader: {
    width: "100%",
  },
});

class HistoryList extends Component {
  render() {
    console.log("this.props.historicalAuctionIDs: ", this.props.historicalAuctionIDs);
    return (
      <div>
        {this.props.historicalAuctionIDs && (
          <GridList cellHeight={550} cols={3}>
            {this.props.historicalAuctionIDs
              .slice()
              .reverse()
              .map(id => {
                return (
                  <GridListTile>
                    <ArtPieceHistoryContainer
                      {...this.props}
                      auctionID={id}
                      auctionData={this.props.historicalAuctions.get(id)}
                    />
                  </GridListTile>
                );
              })}
          </GridList>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(HistoryList);
