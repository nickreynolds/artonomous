import React, { Component } from "react";
import GeneratorsList from "./GeneratorsList";
import { Link } from "react-router";
import { sha3_256 } from "js-sha3";

class Generators extends Component {
  state = { generatorsKey: null, hash: "0xd4e56740f876aef8c010b86a40d5f56745a118d0906a34e69aec8c0db1cb8fa3" };
  componentDidMount() {
    const generatorsKey = this.props.drizzle.contracts.GeneratorRegistry.methods.getGenerators.cacheCall();
    this.setState({ generatorsKey });
  }

  randomizeHash = () => {
    const r2 =
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15);
    console.log("r2: ", r2);
    const r = Math.random() * 1000000;
    console.log("r: ", r);
    const hash = "0x" + sha3_256(r2);
    console.log("hash: ", hash);
    this.setState({ hash });
  };

  render() {
    const generators = this.props.drizzleState.contracts.GeneratorRegistry.getGenerators[this.state.generatorsKey];
    const props = this.props;
    console.log("generators: ", generators);
    return (
      <div>
        <h1>Generators</h1>
        <button onClick={this.randomizeHash}>randomize hash</button>
        <span>hash: {this.state.hash}</span>
        <Link to="/createGenerator">Create Generator</Link>
        {generators && <GeneratorsList {...props} generators={generators.value} hash={this.state.hash} />}
      </div>
    );
  }
}

export default Generators;
