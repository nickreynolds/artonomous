import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router";
import NewContractForm from "../utility/NewContractForm";
import BigNumber from "bignumber.js";

const NavLI = styled.li`
  display: inline;
`;

const NavLink = styled(Link)`
  color: #ffffff;
`;

const NavSpan = styled.span`
  color: #ffffff;
`;

const NavSpanLink = styled.span`
  color: #ffffff;
  text-decoration: underline;
`;

const PopDiv = styled.div`
  position: fixed;
  z-index: 1;
  width: 50%;
  height: 50%;
  background-color: gray;
  right: 5px;
  top: 50px;
`;

class Balance extends Component {
  state = { soulBalanceDataKey: null, daiBalanceDataKey: null };
  componentDidMount() {
    const soulBalanceDataKey = this.props.drizzle.contracts.SoulToken.methods.balanceOf.cacheCall(
      this.props.drizzleState.accounts[0],
    );
    console.log("did mount 1");
    const daiBalanceDataKey = this.props.drizzle.contracts.TestDaiToken.methods.balanceOf.cacheCall(
      this.props.drizzleState.accounts[0],
    );
    this.setState({ soulBalanceDataKey, daiBalanceDataKey });
    console.log("did mount 2");
  }
  render() {
    const balanceData = this.props.drizzleState.contracts.SoulToken.balanceOf[this.state.soulBalanceDataKey];
    const balance = balanceData && BigNumber(balanceData.value).div(1000000000000000000);
    const daiBalanceData = this.props.drizzleState.contracts.TestDaiToken.balanceOf[this.state.daiBalanceDataKey];
    const daiBalance = daiBalanceData && BigNumber(daiBalanceData.value).div(1000000000000000000);
    return (
      <div>
        <NavSpan>{daiBalanceData && <React.Fragment>{daiBalance.toString()} DAI</React.Fragment>}</NavSpan>
        {" --- "}
        <NavSpan>{balanceData && <React.Fragment>{balance.toString()} SOUL</React.Fragment>}</NavSpan>{" "}
        <NavLink to="soul">Buy/Sell</NavLink>
      </div>
    );
  }
}

export default Balance;
