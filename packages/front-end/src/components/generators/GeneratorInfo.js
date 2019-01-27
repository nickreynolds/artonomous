import React, { Component } from "react";
import Generator from "../../../contracts/Generator";
import * as fsapi from "../../fsapi";
import { getGeneratorCode } from "../../redux/actionCreators/generatorActions";
import { connect } from "react-redux";

class GeneratorInfo extends Component {
  state = { generatorUri: null, generatorName: null, hash: null, code: null };
  componentDidMount() {
    const generatorName = this.props.generator;
    this.setState({ generatorName });
    const contract = new this.props.drizzle.web3.eth.Contract(Generator.abi, this.props.generator);

    console.log("GENERATOR INFO GET GENERATOR: ", contract._address);
    this.props.dispatch(getGeneratorCode(contract));
  }

  render() {
    if (this.state.generatorName && this.props.uri && this.props.code) {
      return (
        <div>
          <code>{this.props.code}</code>
        </div>
      );
    }
    return <div>loading</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return { code: state.generatorCode.get(ownProps.generator), uri: state.generatorUri.get(ownProps.generator) };
};
export default connect(mapStateToProps)(GeneratorInfo);
