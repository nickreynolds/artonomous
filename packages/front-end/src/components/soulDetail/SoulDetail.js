import React, { Component } from "react";
import NewContractData from "../utility/NewContractData";
import NewContractForm from "../utility/NewContractForm";
import styled from "styled-components";
import BondingCurve from "./BondingCurve/BondingCurve";
import BondingCurveArtifact from "./BondingCurve.json";
import BigNumber from "bignumber.js";
import { Slider } from "material-ui";
import { getWeb3 } from "../../util/web3/getWeb3";

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
    dataKey: null,
    daiBalanceDataKey: null,
    daiValue: 0,
    soulValue: 0,
    contractAddress: "0x96eaf28b6e59defc8f736faa1681d41382d3aa32",
  };
  async componentDidMount() {
    const web3 = await getWeb3();
    this.setState({ web3 });
    if (this.props.drizzleState.accounts && this.props.drizzleState.accounts[0]) {
      const dataKey = this.props.drizzle.contracts.SoulToken.methods.balanceOf.cacheCall(
        this.props.drizzleState.accounts[0],
      );
      const daiBalanceDataKey = this.props.drizzle.contracts.TestDaiToken.methods.balanceOf.cacheCall(
        this.props.drizzleState.accounts[0],
      );
      this.setState({ dataKey, daiBalanceDataKey });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.drizzleState.accounts !== this.props.drizzleState.accounts) {
      if (this.props.drizzleState.accounts && this.props.drizzleState.accounts[0]) {
        const dataKey = this.props.drizzle.contracts.SoulToken.methods.balanceOf.cacheCall(
          this.props.drizzleState.accounts[0],
        );
        const daiBalanceDataKey = this.props.drizzle.contracts.TestDaiToken.methods.balanceOf.cacheCall(
          this.props.drizzleState.accounts[0],
        );
        this.setState({ dataKey, daiBalanceDataKey });
      }
    }
  }

  handleDaiSliderChange = (event, value) => {
    this.setState({ daiValue: value });
  };

  handleSoulSliderChange = (event, value) => {
    this.setState({ soulValue: value });
  };

  render() {
    const { drizzleState, drizzle } = this.props;
    const balanceData = drizzleState.contracts.SoulToken.balanceOf[this.state.dataKey];
    const registryAddress = drizzle.contracts.GeneratorRegistry.address;
    const balance = balanceData ? balanceData.value / 1000000000000000000 : 0;
    const daiBalanceData = drizzleState.contracts.TestDaiToken.balanceOf[this.state.daiBalanceDataKey];
    const daiBalance = daiBalanceData ? daiBalanceData.value / 1000000000000000000 : 0;

    const bondingCurveAddress = drizzle.contracts.SoulToken.address;
    const { daiValue, soulValue } = this.state;
    const daiValue2 = BigNumber("1000000000000000000").times(daiValue);
    const soulValue2 = BigNumber("1000000000000000000").times(soulValue);
    const soulBalance = BigNumber("1000000000000000000").times(balance);
    return (
      <SoulDiv>
        <br />
        <BuyDiv>
          <Slider value={daiValue} min={0} max={daiBalance} onChange={this.handleDaiSliderChange} />
          <NewContractForm
            contract="TestDaiToken"
            method="approve"
            methodArgs={{ from: drizzleState.accounts[0] }}
            initialMethodArgs={[this.props.drizzle.contracts.SoulToken.address, daiValue2.toString()]}
            hideInputs={true}
          >
            Approve SoulToken to Spend {daiValue2.div(1000000000000000000).toString()} DAI
          </NewContractForm>
          <NewContractForm
            contract="SoulToken"
            method="buy"
            methodArgs={{ from: drizzleState.accounts[0] }}
            initialMethodArgs={[daiValue2.toString()]}
            hideInputs={true}
          >
            Buy {daiValue2.div(1000000000000000000).toString()} DAI of SOUL
          </NewContractForm>
        </BuyDiv>
        {balance && (
          <React.Fragment>
            <BuyDiv>
              <Slider value={soulValue} min={0} max={balance} onChange={this.handleSoulSliderChange} />
              <NewContractForm
                contract="SoulToken"
                method="sell"
                methodArgs={{ from: drizzleState.accounts[0] }}
                initialMethodArgs={[soulValue2.toString()]}
                hideInputs={true}
              >
                Sell {soulValue2.div(1000000000000000000).toString()} of Your SOUL
              </NewContractForm>
            </BuyDiv>
            <br />
            <NewContractForm
              contract="SoulToken"
              method="approve"
              methodArgs={{ from: drizzleState.accounts[0] }}
              initialMethodArgs={[registryAddress, soulBalance.toString()]}
              hideInputs={true}
            >
              Approve Registry To Spend {soulBalance.div(1000000000000000000).toString()} SOUL
            </NewContractForm>
          </React.Fragment>
        )}
        <BondingCurve
          contractAddress={bondingCurveAddress}
          contractArtifact={BondingCurveArtifact}
          settings={{
            poolBalance: 4000000,
            totalSupply: 1000000,
            reserveRatio: 0.2,
          }}
          drizzle={this.props.drizzle}
          drizzleState={this.props.drizzleState}
        />
      </SoulDiv>
    );
  }
}

export default SoulDetail;
