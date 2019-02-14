import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router";
import BigNumber from "bignumber.js";
import { connect } from "react-redux";
import { FormattedCurrency } from "../utility/FormattedCurrency";

const BalanceDiv = styled.ul`
  display: flex;
`;

const NavLI = styled.li`
  display: inline;
  padding: 10px;
  color: #ffffff;
  display: flex;
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
  componentDidMount() {}
  render() {
    const soulBalance = this.props.soulBalance;
    const daiBalance = this.props.daiBalance;
    return (
      <BalanceDiv>
        <NavLI>
        {daiBalance && (
            <React.Fragment>
              <FormattedCurrency value={daiBalance} type={"DAI"}/>
            </React.Fragment>
          )}
        </NavLI>
        <NavLI>
          {soulBalance && (
            <React.Fragment>
            <FormattedCurrency value={soulBalance} type={"SOUL"}/>
            </React.Fragment>
          )}
        </NavLI>
        <NavLI>
        <NavLink to="soul">Buy/Sell</NavLink>
        </NavLI>
      </BalanceDiv>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { soulBalance, daiBalance } = state;
  return { soulBalance, daiBalance };
};
export default connect(mapStateToProps)(Balance);
