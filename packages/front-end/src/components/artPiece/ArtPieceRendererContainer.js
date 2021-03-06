import React, { Component } from "react";
import ArtPieceRenderer from "./ArtPieceRenderer";
import { connect } from "react-redux";

class ArtPieceRendererContainer extends Component {
  state = { generatorUri: null, generatorName: null, hash: null };

  componentDidMount() {
    if (this.props.auctionData) {
      this.update();
      this.onUpdate();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.auctionData != this.props.auctionData) {
      this.update();
      this.onUpdate();
    }
  }

  update() {
    const generatorName = this.props.auctionData.generator;
    this.setState({ generatorName });
  }

  onUpdate() {
    const level = this;
    this.setState({ hash: this.props.hash });
    if (!this.props.hash) {
      this.setState({ hash: this.props.auctionData.hash })
    }
  }

  render() {
    if (this.state.generatorName && this.props.uri && this.state.hash) {
      return <ArtPieceRenderer url={this.props.uri} hash={this.state.hash} code={this.props.code} />;
    }
    return <div>loading</div>;
  }
}
const mapStateToProps = (state, ownProps) => {
  const { generatorCode, generatorUri } = state;
  return {
    auctionData: { ...ownProps.auctionData },
    code: generatorCode.get(ownProps.auctionData.generator),
    uri: generatorUri.get(ownProps.auctionData.generator),
    hash: ownProps.hash,
  };
};
export default connect(mapStateToProps)(ArtPieceRendererContainer);
