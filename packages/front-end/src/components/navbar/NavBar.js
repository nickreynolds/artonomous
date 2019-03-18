import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router";
import Balance from "./Balance";
import Login from "./Login";
import { getAccount, pollAccount } from "../../redux/actionCreators/accountActions";

import { connect } from "react-redux";
import { beginGetCurrentAuction, beginGetHistoricalAuctions } from "../../redux/actionCreators/auctionActions";
import { beginGetGenerators } from "../../redux/actionCreators/generatorActions";

const NavDiv = styled.div`
  min-width: 100%;
  max-height: 30px;
`;

const NavUL = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #000000;
  display: flex;
  align-items: center;
`;

const NavLI = styled.li`
  padding: 10px 10px 10px 10px;
  font-family: "Karla", sans-serif;
`;
const NavSpace = styled.li`
  flex: 1;
`;

const NavLIR = styled.li`
  margin-right: 10px;
  font-family: "Karla", sans-serif;
`;

const NavLink = styled(Link)`
  color: #ffffff;
`;

class NavBar extends Component {
  pollAccount = () => {
    this.props.dispatch(getAccount());
  }
  componentDidMount() {
    this.props.dispatch(getAccount());
    setInterval(this.pollAccount, 5000);
    this.props.dispatch(beginGetCurrentAuction());
    this.props.dispatch(beginGetHistoricalAuctions());
    this.props.dispatch(beginGetGenerators());
  }

  render() {
    const hasAccount = this.props.account;
    return (
      <NavDiv>
        <NavUL>
          <NavLI>
            <NavLink to="/">Artonomous</NavLink>{" "}
          </NavLI>
          <NavLI>
            <NavLink to="/generators">Generators</NavLink>{" "}
          </NavLI>
          <NavLI>
            <NavLink to="/history">History</NavLink>{" "}
          </NavLI>
          <NavLI>
            <NavLink to="/soul">Soul</NavLink>{" "}
          </NavLI>
          <NavLI>
            <NavLink to="/my-activity">My Activity</NavLink>{" "}
          </NavLI>
          <NavSpace />
          <NavLIR>{hasAccount && <Balance {...this.props} />}</NavLIR>
          <NavLIR>{!hasAccount && <Login {...this.props} />}</NavLIR>
        </NavUL>
      </NavDiv>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const { account } = state;
  return { account };
};
export default connect(mapStateToProps)(NavBar);
