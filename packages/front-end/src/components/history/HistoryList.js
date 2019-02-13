import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import GridList from "material-ui/GridList";
import GridListTile from "material-ui/GridList/GridTile";
import ArtPieceHistoryContainer from "./ArtPieceHistoryContainer";
import styled from "styled-components";

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

const HistoryDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const HistoryGrid = styled.div`
  max-width: 95%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
`;

const HistoryListItem = styled.div`
  height: 650px;
  flex-basis: 20%;
  -ms-flex: auto;
  width: 400px;
  position: relative;
  padding: 10px;
  margin: 10px;
  box-sizing: border-box;
`;

class HistoryList extends Component {
  render() {
    // console.log("this.props.historicalAuctionIDs: ", this.props.historicalAuctionIDs);
    return (
      <HistoryDiv>
        {this.props.historicalAuctionIDs && (
          <HistoryGrid>
            {this.props.historicalAuctionIDs
              .slice()
              .reverse()
              .map(id => {
                const auctionData = this.props.historicalAuctions.get(id);
                return (
                  <HistoryListItem>
                    <ArtPieceHistoryContainer
                      {...this.props}
                      auctionID={id}
                      auctionData={auctionData}
                    />
                  </HistoryListItem>
                );
              })}
          </HistoryGrid>
        )}
      </HistoryDiv>
    );
  }
}

export default withStyles(styles)(HistoryList);
