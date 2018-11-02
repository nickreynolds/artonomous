import React, { Component } from "react";
import ArtPiece from "../artPiece/ArtPiece";

import { withStyles } from "@material-ui/core/styles";
import GridList from "material-ui/GridList";
import GridListTile from "material-ui/GridList/GridTile";

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
    return (
      <div>
        {this.props.events && (
          <GridList cellHeight={550} cols={3}>
            {this.props.events
              .slice()
              .reverse()
              .map(event => {
                return (
                  <GridListTile>
                    <ArtPiece {...this.props} blockNum={event.blockNumber} />
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
