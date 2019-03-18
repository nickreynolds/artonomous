import React from "react";
import PropTypes from "prop-types";
import AceEditor from "react-ace";
import P5Sandbox from "../../components/P5Sandbox";
import ReactModal from "react-modal";
import CreateGeneratorModal from "./CreateGeneratorModal";
import styled from "styled-components";
import hashToRandomSeed from "../../hashToRandomSeed";

import "brace/mode/javascript";
import "brace/theme/github";
import * as fsapi from "../../fsapi";

import sizer from "react-sizer";
import { sha3_256 } from "js-sha3";

const CreateGeneratorDiv = styled.div`
display:flex;
`;

const CodeDiv = styled.div`
`;

const PreviewDiv = styled.div`
width: 400px;
`;

class CreateGenerator extends React.Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  };

  state = {
    code: 
`const random64 = "$RANDOM_HASH";
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(random64.charCodeAt(0)+random64.charCodeAt(1)*5, random64.charCodeAt(2)*2, 30);
}`,
    app: 
`const random64 = "$RANDOM_HASH";    
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(random64.charCodeAt(0)+random64.charCodeAt(1)*5, random64.charCodeAt(2)*2, 30);
}
`,
    isProcessing: false,
    hash: "0xd4e56740f876aef8c010b86a40d5f56745a118d0906a34e69aec8c0db1cb8fa3",
  };

  editorDidMount = (editor, monaco) => {};
  onChange = code => {
    this.setState({ code });
  };
  updatePreview = evt => {
    this.setState({ app: this.state.code });
    evt.preventDefault();
  };
  submitContract = evt => {
    evt.preventDefault();
    if (this.state.isProcessing) {
      return;
    }
    this.setState({ isProcessing: true });

    fsapi.createFileFromData(this.state.code).then(result => {
      this.setState({ fileResult: result });
    });
  };
  closeModal = evt => {
    this.setState({ isProcessing: false });
  };
  publishCreation = evt => {
    evt.preventDefault();
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
    const seed = hashToRandomSeed(this.props.hash.substring(2)).toString();
    this.setState({ hash, seed });
  };

  render() {
    return (
      <div>
        <div className="modalWrapper">
          <ReactModal isOpen={this.state.isProcessing} onRequestClose={this.handleModalClose}>
            <CreateGeneratorModal
              drizzle={this.props.drizzle}
              drizzleState={this.props.drizzleState}
              fileResult={this.state.fileResult}
              closeModal={this.closeModal}
            />
          </ReactModal>
        </div>
        <div className="actionBar">
          <h3>Submit a generative work</h3>
          <button onClick={this.randomizeHash}>randomize hash</button>
          <span>hash: {this.state.hash} => {this.state.seed}</span>
        </div>
        <CreateGeneratorDiv>
          <CodeDiv>
          {!this.state.isProcessing && (
            <AceEditor
              mode="javascript"
              theme="github"
              value={this.state.code}
              width={`${800}px`}
              height={`${400}px`}
              onChange={this.onChange}
              disabled={this.state.isProcessing}
              name="maindiv"
              editorProps={{ $blockScrolling: true }}
            />
          )}
          </CodeDiv>
          <PreviewDiv>
            <P5Sandbox
              width={`${this.props.width / 2 - 1}px`}
              height={`${400}px`}
              isPlaying={true}
              code={this.state.app}
              hash={this.state.hash}
            />
          </PreviewDiv>
          </CreateGeneratorDiv>
        <br />
        <a onClick={this.updatePreview} className="button background-color-soul">
          Update Preview
          </a>
        <a onClick={this.submitContract} className="button background-color-soul">
          Submit Code
          </a>
      </div>
    );
  }
}

export default sizer()(CreateGenerator);
