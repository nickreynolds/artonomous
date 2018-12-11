import React, { Component } from "react";
import ArtPieceRendererContainer from "../artPiece/ArtPieceRendererContainer";
import NewContractForm from "../utility/NewContractForm";
import styled from "styled-components";
import GeneratorInfo from "./GeneratorInfo";

const GeneratorInfoDiv = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid black;
`;

const GeneratorDiv = styled.div`
  border: 1px solid black;
`;

class GeneratorsList extends Component {
  state = { stakeKey: null, showInfo: false };
  componentDidMount() {
    const stakeKey = this.props.drizzle.contracts.GeneratorRegistry.methods.getGeneratorStake.cacheCall(
      this.props.generator,
    );
    this.setState({ stakeKey });
  }

  onInfoClick = () => {
    this.setState({ showInfo: !this.state.showInfo });
  };
  render() {
    const stake = this.props.drizzleState.contracts.GeneratorRegistry.getGeneratorStake[this.state.stakeKey];
    return (
      <GeneratorDiv>
        {stake && (
          <GeneratorInfoDiv>
            <span>SOUL Staked: {stake.value}</span>
            <span onClick={this.onInfoClick}>show info</span>
          </GeneratorInfoDiv>
        )}
        <br />

        {this.state.showInfo && (
          <div>
            <GeneratorInfo {...this.props} />
          </div>
        )}
        {!this.state.showInfo && (
          <div>
            <ArtPieceRendererContainer {...this.props} />
            <NewContractForm
              contract="GeneratorRegistry"
              method="depositStake"
              methodArgs={{ from: this.props.drizzleState.accounts[0] }}
              initialMethodArgs={[this.props.generator, "1000"]}
              hideInputs={true}
            >
              Stake 1,000 SOUL
            </NewContractForm>
          </div>
        )}
      </GeneratorDiv>
    );
  }
}

export default GeneratorsList;
