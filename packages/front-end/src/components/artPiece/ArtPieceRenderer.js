import React from "react";
import PropTypes from "prop-types";
import P5Sandbox from "../P5Sandbox";
import * as fsapi from "../../fsapi";

export default class ArtPieceRenderer extends React.Component {
  static propTypes = {
    url: PropTypes.string,
  };
  state = {
    code: null,
  };

  componentDidMount() {
    fsapi.getTextFileFromPath(this.props.url.split("/")[0]).then(code => {
      this.setState({ code });
    });
  }
  render() {
    if (this.state.code) {
      return <P5Sandbox isPlaying={true} width="450px" height="450px" hash={this.props.hash} code={this.state.code} />;
    }
    return <div>loading from ipfs...</div>;
  }
}
