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
  state = { dataKey: null };
  componentDidMount() {
    const dataKey = this.props.drizzle.contracts.SoulToken.methods.balanceOf.cacheCall(
      this.props.drizzleState.accounts[0],
    );
    this.setState({ dataKey });
  }
  render() {
    const balanceData = this.props.drizzleState.contracts.SoulToken.balanceOf[this.state.dataKey];
    const balance = balanceData && BigNumber(balanceData.value).div(1000000000000000000);
    return (
      <div>
        <NavSpan>{balanceData && <React.Fragment>{balance.toString()} SOUL</React.Fragment>}</NavSpan>{" "}
        <NavLink to="soul">Buy/Sell</NavLink>
      </div>
    );
  }
}

export default Balance;
