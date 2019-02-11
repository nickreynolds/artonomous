import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router";
import BigNumber from "bignumber.js";
import { connect } from "react-redux";

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
  componentDidMount() {}
  render() {
    const soulBalance = this.props.soulBalance;
    const daiBalance = this.props.daiBalance;
    return (
      <div>
        <NavSpan>
          {daiBalance && (
            <React.Fragment>
              {BigNumber("1e-18")
                .times(daiBalance)
                .toFixed(4)
                .toString()}{" "}
              DAI
            </React.Fragment>
          )}
        </NavSpan>
        {" --- "}
        <NavSpan>
          {soulBalance && (
            <React.Fragment>
              {BigNumber("1e-18")
                .times(soulBalance)
                .toFixed(4)
                .toString()}{" "}
              SOUL
            </React.Fragment>
          )}
        </NavSpan>{" "}
        <NavLink to="soul">Buy/Sell</NavLink>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { soulBalance, daiBalance } = state;
  return { soulBalance, daiBalance };
};
export default connect(mapStateToProps)(Balance);
