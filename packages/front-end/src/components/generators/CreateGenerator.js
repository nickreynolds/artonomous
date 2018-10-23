import React from "react";
import PropTypes from "prop-types";
import AceEditor from "react-ace";
import P5Sandbox from "../../components/P5Sandbox";
import ReactModal from "react-modal";
import CreateGeneratorModal from "./CreateGeneratorModal";

import "brace/mode/javascript";
import "brace/theme/github";
import * as fsapi from "../../fsapi";

import sizer from "react-sizer";
import { sha3_256 } from "js-sha3";

class CreateGenerator extends React.Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  };

  state = {
    code: `const random64 = "$RANDOM_HASH";
    
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(random64.charCodeAt(0)+random64.charCodeAt(1)*5, random64.charCodeAt(2)*2, 30);
}`,
    app: `const random64 = "$RANDOM_HASH";
    
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(random64.charCodeAt(0)+random64.charCodeAt(1)*5, random64.charCodeAt(2)*2, 30);
}`,
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
      // fsapi.getTextFileFromPath(result[0].hash).then(fileOut => {
      //   console.log("has file from system", fileOut);
      // });
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
    console.log("r2: ", r2);
    const r = Math.random() * 1000000;
    console.log("r: ", r);
    const hash = "0x" + sha3_256(r2);
    console.log("hash: ", hash);
    this.setState({ hash });
  };

  render() {
    const options = {
      selectOnLineNumbers: true,
    };
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
          <a onClick={this.updatePreview} className="button background-color-soul">
            Update Preview
          </a>
          <a onClick={this.submitContract} className="button background-color-soul">
            Submit Code
          </a>
          <button onClick={this.randomizeHash}>randomize hash</button>
          <span>hash: {this.state.hash}</span>
        </div>
        <div className="editorpage">
          {!this.state.isProcessing && (
            <AceEditor
              mode="javascript"
              theme="github"
              value={this.state.code}
              width={`${this.props.width / 2 - 1}px`}
              height={`${400}px`}
              onChange={this.onChange}
              disabled={this.state.isProcessing}
              name="maindiv"
              editorProps={{ $blockScrolling: true }}
            />
          )}
          <div className="preview">
            <P5Sandbox
              width={`${this.props.width / 2 - 1}px`}
              height={`${400}px`}
              isPlaying={true}
              code={this.state.app}
              hash={this.state.hash}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default sizer()(CreateGenerator);
