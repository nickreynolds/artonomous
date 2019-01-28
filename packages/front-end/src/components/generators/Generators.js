import React, { Component } from "react";
import GeneratorsList from "./GeneratorsList";
import { Link } from "react-router";
import { sha3_256 } from "js-sha3";
import styled from "styled-components";
import { RaisedButton } from "material-ui";
import hashToRandomSeed from "../../hashToRandomSeed";
import { connect } from "react-redux";

const GeneratorsBackground = styled.div`
  background-color: #a4a4a4;
  height: 100%;
  width: 100%;
  top: 10px;
`;

const GeneratorHeader = styled.ul`
  list-style-type: none;
  overflow: hidden;
  background-color: #a4a4a4;
  display: flex;
  align-items: center;
`;

const RandomizeContainer = styled.li`
  padding: 10px 10px 10px 10px;
`;
const NavSpace = styled.li`
  flex: 1;
`;

const CreateContainer = styled.li`
  margin-right: 10px;
`;

class Generators extends Component {
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

  createGenerator = () => {
    console.log("this.props: ", this.props);
    this.props.router.push("/CreateGenerator");
  };

  render() {
    const { generators } = this.props;
    console.log("generators: ", generators);
    return (
      <GeneratorsBackground>
        <GeneratorHeader>
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
          <NavSpace />
          <CreateContainer>
            <RaisedButton onClick={this.createGenerator} primary>
              Create Generator
            </RaisedButton>
          </CreateContainer>
        </GeneratorHeader>
        <div>{generators && <GeneratorsList generators={generators} hash={this.state.hash} />}</div>
      </GeneratorsBackground>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const { generatorAddresses } = state;
  return {
    generators: generatorAddresses,
  };
};
export default connect(mapStateToProps)(Generators);
