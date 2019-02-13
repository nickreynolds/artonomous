import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Generator from "./Generator";
import { RaisedButton } from "material-ui";
import { sha3_256 } from "js-sha3";
import hashToRandomSeed from "../../hashToRandomSeed";

const GeneratorPageDiv = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`;
const GeneratorContainerDiv = styled.div`
margin-top: 30px;
`;
const RandomizeContainer = styled.div`
  margin-top: 20px;
  padding: 10px 10px 10px 10px;
`;
class GeneratorsPage extends Component {
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
    return (
      <GeneratorPageDiv>
        <RandomizeContainer>
          <RaisedButton variant="contained" onClick={this.randomizeHash}>
            randomize
            </RaisedButton>
          <span>
            {" hash: "}
            {this.state.hash} {" => seed: "}
            {this.state.seed}
          </span>
        </RandomizeContainer>
        <GeneratorContainerDiv>
          <Generator generator={this.props.generatorAddress} hash={this.state.hash}/>
        </GeneratorContainerDiv>
      </GeneratorPageDiv>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    generatorAddress: ownProps.params.generatorAddress
  };
};
    
export default connect(mapStateToProps)(GeneratorsPage);
