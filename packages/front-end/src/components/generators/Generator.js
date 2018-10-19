import React, { Component } from "react";
import ArtPieceRendererContainer from "../artPiece/ArtPieceRendererContainer";
import NewContractForm from "../utility/NewContractForm";

class GeneratorsList extends Component {
  state = { stakeKey: null };
  componentDidMount() {
    const stakeKey = this.props.drizzle.contracts.GeneratorRegistry.methods.getGeneratorStake.cacheCall(
      this.props.generator,
    );
    this.setState({ stakeKey });
  }
  render() {
    const stake = this.props.drizzleState.contracts.GeneratorRegistry.getGeneratorStake[this.state.stakeKey];
    return (
      <div>
        {stake && <span>SOUL Staked: {stake.value}</span>}
        <br />
        <span>Generator Address: {this.props.generator}</span>
        <ArtPieceRendererContainer {...this.props} />
        <NewContractForm
          contract="GeneratorRegistry"
          method="depositStake"
          initialMethodArgs={[this.props.generator, "1000"]}
          hideInputs={true}
        >
          Stake 1,000 SOUL
        </NewContractForm>
      </div>
    );
  }
}

export default GeneratorsList;
