import React, { Component } from "react";
import GeneratorsList from "./GeneratorsList";
import { Link } from "react-router";

class Generators extends Component {
  state = { generatorsKey: null };
  componentDidMount() {
    const generatorsKey = this.props.drizzle.contracts.GeneratorRegistry.methods.getGenerators.cacheCall();
    this.setState({ generatorsKey });
  }
  render() {
    const generators = this.props.drizzleState.contracts.GeneratorRegistry.getGenerators[this.state.generatorsKey];
    const props = this.props;
    return (
      <div>
        <h1>Generators</h1>
        <Link to="/createGenerator">Create Generator</Link>
        {generators && <GeneratorsList {...props} generators={generators.value} />}
      </div>
    );
  }
}

export default Generators;
