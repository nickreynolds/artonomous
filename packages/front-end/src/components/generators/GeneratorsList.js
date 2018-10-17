import React, { Component } from "react";
import ArtPieceRendererContainer from "../artPiece/ArtPieceRendererContainer";
import { Grid } from "material-ui";

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

class GeneratorsList extends Component {
  render() {
    return (
      <div>
        {this.props.generators && (
          <GridList cellHeight={500} cols={3}>
            {this.props.generators.reverse().map(generator => {
              return (
                <GridListTile>
                  <ArtPieceRendererContainer {...this.props} generator={generator} />
                </GridListTile>
              );
            })}
          </GridList>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(GeneratorsList);
