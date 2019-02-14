import React from "react";
import { GeneratorFactory } from "../../wrappers/contractWrappers";
import { connect } from "react-redux";

class CreateGeneratorModal extends React.Component {
  state = {
    name: "",
  };

  updateName = evt => {
    this.setState({ name: evt.target.value });
  };

  submit = async () => {
    const fileResult = this.props.fileResult[0];
    await GeneratorFactory.methods.createGenerator(
      this.state.name,
      [fileResult.hash, fileResult.path].join("/"),
    ).send({from: this.props.account});
  };

  render() {
    return (
      <div>
        <h1>Publish your creation!</h1>
        <h3>First, what do you want to call it:</h3>
        <div>
          <input type="text" onChange={this.updateName} value={this.state.name} className="textInput" />
        </div>
        <div class="actionBar">
          {this.props.fileResult && (
            <button className="button background-color-soul button-large" onClick={this.submit}>
              Publish!
            </button>
          )}
          {!this.props.fileResult && <h3>uploading...</h3>}
        </div>
        <div>
          <button className="button background-color-soul button-large" onClick={this.props.closeModal}>
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    account: state.account
  }
}
export default connect(mapStateToProps)(CreateGeneratorModal);
