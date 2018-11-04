import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router";
import NewContractForm from "../utility/NewContractForm";

const NavLI = styled.li`
  display: inline;
`;

const NavSpan = styled.span`
  color: #ffffff;
`;

class Balance extends Component {
  state = { dataKey: null };
  componentDidMount() {
    const dataKey = this.props.drizzle.contracts.SoulToken.methods.balanceOf.cacheCall(
      this.props.drizzleState.accounts[0],
    );
    this.setState({ dataKey });
  }
  render() {
    const balance = this.props.drizzleState.contracts.SoulToken.balanceOf[this.state.dataKey];
    const registryAddress = this.props.drizzle.contracts.GeneratorRegistry.address;
    return (
      <div>
        <NavSpan>SOUL balance: {balance && balance.value}</NavSpan>{" "}
        <NewContractForm contract="SoulToken" method="buy" methodArgs={{ value: "100000000000000000" }}>
          Buy .1 ETH of SOUL
        </NewContractForm>
        {balance && (
          <NewContractForm contract="SoulToken" method="sell" initialMethodArgs={[balance.value]}>
            Sell Your Soul
          </NewContractForm>
        )}
        <NewContractForm
          contract="SoulToken"
          method="approve"
          initialMethodArgs={[registryAddress, "10000"]}
          hideInputs={true}
        >
          Approve Registry To Spend 10,000 SOUL
        </NewContractForm>
      </div>
    );
  }
}

export default Balance;
