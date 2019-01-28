import React, { Component } from "react";
import styled from "styled-components";
import BondingCurve from "./BondingCurve/BondingCurve";
import BondingCurveArtifact from "./BondingCurve.json";
import BigNumber from "bignumber.js";
import { Slider } from "material-ui";
import { getWeb3 } from "../../util/web3/getWeb3";
import { connect } from "react-redux";
import { DaiToken, SoulToken } from "../../wrappers/contractWrappers";

const SoulDiv = styled.div`
  width: 50%;
  top: 100px;
  margin-left: auto;
  margin-right: auto;
`;

const BuyDiv = styled.div`
  border: 1px solid black;
  padding: 5px;
  margin: 5px;
`;

class SoulDetail extends Component {
  state = {
    web3: null,
    daiValue: 0,
    soulValue: 0,
  };

  handleDaiSliderChange = (event, value) => {
    this.setState({ daiValue: value });
  };

  handleSoulSliderChange = (event, value) => {
    this.setState({ soulValue: value });
  };

  tryBuySoul = async () => {
    const needToSpend = BigNumber("1000000000000000000").times(this.state.daiValue);
    let result;
    if (needToSpend.isGreaterThan(BigNumber(this.props.daiUserSoulApprovalBalance))) {
      result = await DaiToken.methods.approve(SoulToken._address, needToSpend).send({ from: this.props.account });
    }
    if (!result || result.status) {
      await SoulToken.methods.buy(needToSpend).send({ from: this.props.account });
    }
  };

  trySellSoul = async () => {
    const needToSell = BigNumber("1000000000000000000").times(this.state.soulValue);
    await SoulToken.methods.sell(needToSell).send({ from: this.props.account });
  };

  render() {
    const { soulBalance, daiBalance } = this.props;
    const soulBalance2 = soulBalance ? soulBalance / 1000000000000000000 : 0;
    const daiBalance2 = daiBalance ? daiBalance / 1000000000000000000 : 0;

    const { daiValue, soulValue } = this.state;
    const daiValue2 = BigNumber("1000000000000000000").times(daiValue);
    const soulValue2 = BigNumber("1000000000000000000").times(soulValue);
    return (
      <SoulDiv>
        <br />
        <BuyDiv>
          <Slider value={daiValue} min={0} max={daiBalance2} onChange={this.handleDaiSliderChange} />
          <button onClick={this.tryBuySoul}>Buy: {daiValue} DAI worth of SOUL</button>
        </BuyDiv>
        <BuyDiv>
          <Slider value={soulValue} min={0} max={soulBalance2} onChange={this.handleSoulSliderChange} />
          <button onClick={this.trySellSoul}>Sell: {soulValue} SOUL</button>
        </BuyDiv>
      </SoulDiv>
    );
  }
}

{
  /* <BondingCurve
contractAddress={bondingCurveAddress}
contractArtifact={BondingCurveArtifact}
settings={{
  poolBalance: 4000000,
  totalSupply: 1000000,
  reserveRatio: 0.2,
}}
drizzle={this.props.drizzle}
drizzleState={this.props.drizzleState}
/> */
}

const mapStateToProps = (state, ownProps) => {
  const { account, soulBalance, daiBalance, daiUserSoulApprovalBalance } = state;
  return { account, soulBalance, daiBalance, daiUserSoulApprovalBalance };
};
export default connect(mapStateToProps)(SoulDetail);
