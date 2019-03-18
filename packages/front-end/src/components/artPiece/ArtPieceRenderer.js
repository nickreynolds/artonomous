import React from "react";
import P5Sandbox from "../P5Sandbox";

export default class ArtPieceRenderer extends React.Component {
  render() {
    if (this.props && this.props.code) {
      return <P5Sandbox isPlaying={true} width="380px" height="380px" hash={this.props.hash} code={this.props.code} />;
    }
    return <div>loading from ipfs...</div>;
  }
}
