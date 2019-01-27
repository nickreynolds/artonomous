import React, { Component } from "react";
import ArtPieceRendererContainer from "../artPiece/ArtPieceRendererContainer";
import NewContractForm from "../utility/NewContractForm";
import styled from "styled-components";
import GeneratorInfo from "./GeneratorInfo";
import BigNumber from "bignumber.js";
import { Slider, Card } from "material-ui";

const GeneratorInfoDiv = styled(Card)`
  display: flex;
  justify-content: space-around;
`;

const GeneratorDiv = styled(Card)`
  width: 400px;
  height: 650px;
`;

const SliderDiv = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  bottom: 0px;
`;

const InnerInputDiv = styled.div`
  max-width: 10%;
`;

const InnerSliderDiv = styled.div`
  max-width: 70%;
  min-width: 70%;
`;

const InnerButtonDiv = styled.div`
  max-width: 15%;
`;

class GeneratorsList extends Component {
  state = {
    stakeKey: null,
    soulBalanceKey: null,
    showInfo: false,
    soulValue: 0,
  };
  componentDidMount() {
    const stakeKey = this.props.drizzle.contracts.GeneratorRegistry.methods.getGeneratorStake.cacheCall(
      this.props.generator,
    );
    let soulBalanceKey;
    if (this.props.drizzleState.accounts && this.props.drizzleState.accounts[0]) {
      soulBalanceKey = this.props.drizzle.contracts.SoulToken.methods.balanceOf.cacheCall(
        this.props.drizzleState.accounts[0],
      );
    }
    this.setState({ stakeKey, soulBalanceKey });
  }

  onInfoClick = () => {
    this.setState({ showInfo: !this.state.showInfo });
  };
  handleSoulSliderChange = (event, value) => {
    this.setState({ soulValue: value });
  };
  render() {
    const { drizzleState, drizzle } = this.props;
    const { soulValue } = this.state;

    const stake = this.props.drizzleState.contracts.GeneratorRegistry.getGeneratorStake[this.state.stakeKey];
    const soulBalanceData = drizzleState.contracts.SoulToken.balanceOf[this.state.soulBalanceKey];
    const soulBalance = soulBalanceData ? soulBalanceData.value / 1000000000000000000 : 0;

    const soulValue2 = BigNumber("1000000000000000000").times(soulValue);

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

            <SliderDiv>
              <InnerSliderDiv>
                <Slider value={soulValue} min={0} max={soulBalance} onChange={this.handleSoulSliderChange} />
              </InnerSliderDiv>
              <InnerButtonDiv>
                <NewContractForm
                  contract="GeneratorRegistry"
                  method="depositStake"
                  methodArgs={{ from: this.props.drizzleState.accounts[0] }}
                  initialMethodArgs={[this.props.generator, soulValue2.toString(10)]}
                  hideInputs={true}
                >
                  Stake {soulValue2.div(1000000000000000000).toString()} SOUL
                </NewContractForm>
              </InnerButtonDiv>
            </SliderDiv>
          </div>
        )}
      </GeneratorDiv>
    );
  }
}

export default GeneratorsList;
