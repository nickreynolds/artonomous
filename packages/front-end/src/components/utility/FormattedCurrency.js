import React, { Component } from "react";
import styled from "styled-components";
import BigNumber from "bignumber.js";
import ReactHover from "react-hover";

const PopupDiv = styled.div`
background-color: white;
color: black;
border: 1px black`;

export class FormattedCurrency extends Component {
    render() {
      const options = {
        followCursor: false,
        shiftX: 0,
        shiftY: 0
      }
      return (<ReactHover
        options={options}>
        <ReactHover.Trigger type='trigger'>
          <span>{BigNumber("1e-18").times(this.props.value).toFixed(4)} {this.props.type}</span>
        </ReactHover.Trigger>
        <ReactHover.Hover type='hover'>
          <PopupDiv>
          <span>{BigNumber("1e-18").times(this.props.value).toString()} {this.props.type}</span>
          </PopupDiv>
        </ReactHover.Hover>
      </ReactHover>);
    }
}
