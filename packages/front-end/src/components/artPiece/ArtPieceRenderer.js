import React from "react";
import PropTypes from "prop-types";
import P5Sandbox from "../P5Sandbox";
import * as fsapi from "../../fsapi";

export default class ArtPieceRenderer extends React.Component {
  render() {
    if (this.props && this.props.code) {
      return <P5Sandbox isPlaying={true} width="380px" height="380px" hash={this.props.hash} code={this.props.code} />;
    }
    return <div>loading from ipfs...</div>;
  }
}
