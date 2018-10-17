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

import "./CreateGenerator.css";

class CreateGenerator extends React.Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  };

  state = {
    code: `function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}`,
    app: `function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}`,
    isProcessing: false,
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
            />
          </div>
        </div>
      </div>
    );
  }
}

export default sizer()(CreateGenerator);
