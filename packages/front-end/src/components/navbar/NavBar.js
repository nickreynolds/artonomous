import React, { Component } from "react";
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from "react-bootstrap";
import styled from "styled-components";
import { Link } from "react-router";
import { ContractData } from "drizzle-react-components";
import PropTypes from "prop-types";
import NewContractForm from "../utility/NewContractForm";
import { DrizzleContext } from "drizzle-react";
import Balance from "./Balance";
import Login from "./Login";

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
  render() {
    const accounts = this.props.drizzleState.accounts;
    const hasAccount = accounts.hasOwnProperty(0);
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
          {hasAccount && <Balance {...this.props} />}
          {!hasAccount && <Login {...this.props} />}
        </NavUL>
      </NavDiv>
    );
  }
}

export default NavBar;
