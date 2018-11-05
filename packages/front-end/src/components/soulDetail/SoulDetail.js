import React, { Component } from "react";
import NewContractData from "../utility/NewContractData";
import NewContractForm from "../utility/NewContractForm";
import Slider from "@material-ui/lab/Slider";
import styled from "styled-components";

const SoulDiv = styled.div`
  width: 50%;
  top: 100px;
  margin-left: auto;
  margin-right: auto;
`;

class SoulDetail extends Component {
  state = { dataKey: null, ethValue: 0, soulValue: 0 };
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
    console.log("this.props.drizzleState: ", this.props.drizzleState);
    console.log("this.props.drizzle: ", this.props.drizzle);
    const balance = this.props.drizzleState.contracts.SoulToken.balanceOf[this.state.dataKey];
    console.log("balance:", balance);
    const newBalance = balance ? balance.value : 0;
    console.log("newBalance: ", newBalance);
    const ethBalance = this.props.drizzleState.accountBalances[this.props.drizzleState.accounts[0]];
    console.log("ethbalance: ", ethBalance);
    const registryAddress = this.props.drizzle.contracts.GeneratorRegistry.address;

    const { ethValue, soulValue } = this.state;
    console.log("ethValue: ", ethValue);
    console.log("ethValue.toString(): ", ethValue.toString());
    const ethValue2 = Number(ethValue * 100000000000000000).toString();
    console.log("ethValue2: ", ethValue2);

    const testValue = "100000000000000000";
    console.log("ethValue2 === testValue", ethValue2 === testValue);
    return (
      <SoulDiv>
        <br />
        <br />
        <Slider value={ethValue} onChange={this.handleEthSliderChange} min={0} max={ethBalance / 100000000000000000} />
        <br />
        <NewContractForm contract="SoulToken" method="buy" methodArgs={{ value: testValue }}>
          Buy {testValue} ETH of SOUL
        </NewContractForm>
        <br />
        <br />
        {balance && (
          <React.Fragment>
            <Slider value={soulValue} onChange={this.handleSoulSliderChange} min={0} max={newBalance} />
            <br />
            <NewContractForm
              contract="SoulToken"
              method="sell"
              methodArgs={{ from: this.props.drizzleState.accounts[0] }}
              initialMethodArgs={[testValue]}
              hideInputs={true}
            >
              Sell {testValue} of Your SOUL
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
      </SoulDiv>
    );
  }
}

export default SoulDetail;
