import React, { Component } from "react";
import GeneratorsList from "./GeneratorsList";
import { Link } from "react-router";
import { sha3_256 } from "js-sha3";
import styled from "styled-components";

const GeneratorsBackground = styled.div`
  background-color: #a4a4a4;
  height: 100%;
  width: 100%;
`;

class Generators extends Component {
  state = { hash: "0xd4e56740f876aef8c010b86a40d5f56745a118d0906a34e69aec8c0db1cb8fa3" };

  randomizeHash = () => {
    const r2 =
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15);
    const hash = "0x" + sha3_256(r2);
    this.setState({ hash });
  };

  render() {
    const events = this.props.drizzleState.contracts.GeneratorRegistry.events.filter(
      event => event.event === "GeneratorAdded",
    );
    const generators = events.map(e => e.returnValues[0]);
    const props = this.props;
    return (
      <GeneratorsBackground>
        <div>
          <h1>Generators</h1>
          <button onClick={this.randomizeHash}>randomize hash</button>
          <span>hash: {this.state.hash}</span>
          <Link to="/createGenerator">Create Generator</Link>
        </div>
        <div>{generators && <GeneratorsList {...props} generators={generators} hash={this.state.hash} />}</div>
      </GeneratorsBackground>
    );
  }
}

export default Generators;
