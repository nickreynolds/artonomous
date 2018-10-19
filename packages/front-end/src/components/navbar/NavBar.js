import React, { Component } from "react";
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from "react-bootstrap";
import styled from "styled-components";
import { Link } from "react-router";
import { ContractData } from "drizzle-react-components";
import PropTypes from "prop-types";
import NewContractForm from "../utility/NewContractForm";
import { DrizzleContext } from "drizzle-react";

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
`;

const NavLI = styled.li`
  display: inline;
`;

const NavSpan = styled.span`
  color: #ffffff;
`;

const NavLink = styled(Link)`
  color: #ffffff;
`;

class NavBar extends Component {
  state = { dataKey: null };
  componentDidMount() {
    const dataKey = this.props.drizzle.contracts.SoulToken.methods.balanceOf.cacheCall(
      this.props.drizzleState.accounts[0],
    );
    this.setState({ dataKey });
    console.log("state set with dataKeY: ", dataKey);
  }
  render() {
    console.log("this.props:", this.props);
    console.log("render with dataKey: ", this.state.dataKey);
    const balance = this.props.drizzleState.contracts.SoulToken.balanceOf[this.state.dataKey];
    const registryAddress = this.props.drizzle.contracts.GeneratorRegistry.address;
    console.log("balance: ", balance);
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
            <NavSpan>SOUL balance: {balance && balance.value}</NavSpan>{" "}
          </NavLI>
          <NavLI>
            <NewContractForm contract="SoulToken" method="buy" methodArgs={{ value: "100000000000000000" }}>
              Buy .1 ETH of SOUL
            </NewContractForm>
          </NavLI>
          <NavLI>
            <NewContractForm
              contract="SoulToken"
              method="approve"
              initialMethodArgs={[registryAddress, "10000"]}
              hideInputs={true}
            >
              Approve Registry To Spend 1000 SOUL
            </NewContractForm>
          </NavLI>
        </NavUL>
      </NavDiv>
    );
  }
}

export default NavBar;
