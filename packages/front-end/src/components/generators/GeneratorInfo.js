import React, { Component } from "react";
import { getGeneratorInfo } from "../../redux/actionCreators/generatorActions";
import { connect } from "react-redux";
import Code from 'react-code-prettify';
import styled from "styled-components";

const CodeDiv = styled.div`
max-height: 400px;
overflow-y: scroll;
`;

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
        <CodeDiv>
          <Code codeString={this.props.code} language="javascript"/>
        </CodeDiv>
      );
    }
    return <div>loading</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return { code: state.generatorCode.get(ownProps.generator), uri: state.generatorUri.get(ownProps.generator) };
};
export default connect(mapStateToProps)(GeneratorInfo);
