import React, { Component } from "react";
import "./NavBar.css";
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from "react-bootstrap";
import styled from "styled-components";
import { Link } from "react-router";

const NavDiv = styled.div`
  min-width: 100%;
  max-height: 20px;
`;

class NavBar extends Component {
  render() {
    console.log("NAVBAR");
    return (
      <NavDiv>
        <ul>
          <li eventKey={1}>
            <Link to="/">Artonomous</Link>
          </li>
          <li eventKey={1}>
            <Link to="/generators">Generators</Link>
          </li>
        </ul>
      </NavDiv>
    );
  }
}

export default NavBar;
