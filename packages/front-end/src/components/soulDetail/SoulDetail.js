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
    const balance = this.props.drizzleState.contracts.SoulToken.balanceOf[this.state.dataKey];
    const registryAddress = this.props.drizzle.contracts.GeneratorRegistry.address;

    const { ethValue, soulValue } = this.state;
    return (
      <SoulDiv>
        <br />
        <Slider value={ethValue} onChange={this.handleEthSliderChange} />
        <br />
        <NewContractForm contract="SoulToken" method="buy" methodArgs={{ value: this.state.ethValue }}>
          Buy {this.state.ethValue} ETH of SOUL
        </NewContractForm>
        <br />
        <br />
        {balance && (
          <React.Fragment>
            <Slider value={soulValue} onChange={this.handleSoulSliderChange} />
            <br />
            <NewContractForm contract="SoulToken" method="sell" initialMethodArgs={[soulValue]}>
              Sell Your Soul
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
