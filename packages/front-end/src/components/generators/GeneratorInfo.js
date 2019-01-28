import React, { Component } from "react";
import Generator from "../../../contracts/Generator";
import * as fsapi from "../../fsapi";
import { getGeneratorInfo } from "../../redux/actionCreators/generatorActions";
import { connect } from "react-redux";

class GeneratorInfo extends Component {
  state = { generatorUri: null, generatorName: null, hash: null, code: null };
  componentDidMount() {
    const generatorName = this.props.generator;
    this.setState({ generatorName });
    this.props.dispatch(getGeneratorInfo(this.props.generator));
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
