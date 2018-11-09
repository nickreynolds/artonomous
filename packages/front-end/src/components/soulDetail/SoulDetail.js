import React, { Component } from "react";
import NewContractData from "../utility/NewContractData";
import NewContractForm from "../utility/NewContractForm";
import styled from "styled-components";
import BondingCurve from "./BondingCurve/BondingCurve";
import BondingCurveArtifact from "./BondingCurve.json";
import BigNumber from "bignumber.js";

const SoulDiv = styled.div`
  width: 50%;
  top: 100px;
  margin-left: auto;
  margin-right: auto;
`;

class SoulDetail extends Component {
  state = { dataKey: null, ethValue: 0, soulValue: 0, contractAddress: "0x96eaf28b6e59defc8f736faa1681d41382d3aa32" };
  componentDidMount() {
    const dataKey = this.props.drizzle.contracts.SoulToken.methods.balanceOf.cacheCall(
      this.props.drizzleState.accounts[0],
    );
    this.setState({ dataKey });
  }

  handleEthSliderChange = (event, value) => {
    this.setState({ ethValue: value });
  };

  handleSoulSliderChange = (event, value) => {
    this.setState({ soulValue: value });
  };

  render() {
    const balance = this.props.drizzleState.contracts.SoulToken.balanceOf[this.state.dataKey];
    const newBalance = balance ? balance.value : 0;
    const ethBalance = this.props.drizzleState.accountBalances[this.props.drizzleState.accounts[0]];
    const registryAddress = this.props.drizzle.contracts.GeneratorRegistry.address;
    const bondingCurveAddress = this.props.drizzle.contracts.SoulToken.address;
    const { ethValue, soulValue } = this.state;
    const ethValue2 = Number(ethValue * 100000000000000000).toString();

    const testValue = BigNumber("100000000000000000");
    return (
      <SoulDiv>
        <br />
        <br />
        <NewContractForm contract="SoulToken" method="buy" methodArgs={{ value: testValue.toString() }}>
          Buy {testValue.div(1000000000000000000).toString()} ETH of SOUL
        </NewContractForm>
        <br />
        <br />
        {balance && (
          <React.Fragment>
            <br />
            <NewContractForm
              contract="SoulToken"
              method="sell"
              methodArgs={{ from: this.props.drizzleState.accounts[0] }}
              initialMethodArgs={[testValue.toString()]}
              hideInputs={true}
            >
              Sell {testValue.div(1000000000000000000).toString()} of Your SOUL
            </NewContractForm>
            <br />
            <NewContractForm
              contract="SoulToken"
              method="approve"
              initialMethodArgs={[registryAddress, "10000"]}
              hideInputs={true}
            >
              Approve Registry To Spend 10,000 SOUL
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
