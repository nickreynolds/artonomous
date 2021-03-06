import React, { Component } from "react";
import GeneratorsList from "../generators/GeneratorsList";
import { sha3_256 } from "js-sha3";
import styled from "styled-components";
import { RaisedButton } from "material-ui";
import hashToRandomSeed from "../../hashToRandomSeed";
import { connect } from "react-redux";
import HistoryList from "../history/HistoryList";

const GeneratorsBackground = styled.div`
`;

const GeneratorHeader = styled.ul`
  list-style-type: none;
  overflow: hidden;
  display: flex;
  align-items: center;
`;

const RandomizeContainer = styled.li`
  padding: 10px 10px 10px 10px;
`;
const NavSpace = styled.li`
  flex: 1;
`;

class MyActivity extends Component {
  state = { hash: "", seed: 0 };

  componentDidMount = () => {
    this.randomizeHash();
  };

  randomizeHash = () => {
    const r2 =
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15);
    const hash = "0x" + sha3_256(r2);
    const seed = hashToRandomSeed(hash.substring(2));
    this.setState({ hash, seed });
  };

  render() {
    const { generators } = this.props;
    return (
      <GeneratorsBackground>
        <GeneratorHeader>
          My Generators:
          <RandomizeContainer>
            <RaisedButton variant="contained" onClick={this.randomizeHash}>
              randomize
            </RaisedButton>
            <span>
              {" => seed: "}
              {this.state.seed}
            </span>
          </RandomizeContainer>
          <NavSpace />
        </GeneratorHeader>
        <div>{generators && <GeneratorsList generators={generators} hash={this.state.hash} />}</div>
        My Bought Art:
        <div>
          {this.props.userBoughtArts && (
            <HistoryList
              {...this.props}
              auctionIDs={this.props.userBoughtArts}
              auctions={this.props.historicalAuctions}
            />)}
        </div>
      </GeneratorsBackground>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const { myGeneratorAddresses, account, userToBoughtArts, historicalAuctions } = state;
  const userBoughtArts = userToBoughtArts.get(account);
  return {
    generators: myGeneratorAddresses,
    userBoughtArts,
    historicalAuctions
  };
};
export default connect(mapStateToProps)(MyActivity);
