import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import ErrorBoundary from "react-error-boundary";
import { getWeb3 } from "../../../util/web3/getWeb3";
import BondingCurveChart from "./components/charts/BondingCurve/BondingCurveChart";
import Timeline from "./components/charts/Timeline/Timeline";
import ErrorComponent from "./components/Error";
import Loader from "./components/Loader";

import "react-vis/dist/style.css";
import { timeFormatDefaultLocale } from "d3-time-format";
import english from "d3-time-format/locale/en-US.json";

import styled from "styled-components";

const StyledTabs = styled.ul`
   {
    padding-left: 0;
    list-style-type: none;
    display: flex;
    margin: 0;
    padding: 0.7rem 0.7rem 0 0.7rem;
  }
`;

const StyledTab = styled.li`
   {
    padding: 0;
    border: none;
    font: inherit;
    color: inherit;
    background-color: transparent;
    cursor: pointer;
    color: $brand-grey-light;
    text-transform: uppercase;
    font-family: $font-family-button;
    display: inline-block;
    padding: 0.5rem 1rem;
    border-radius: 0.1rem;
    border: none;
    background: transparent;
    margin-right: 0.1rem;
    font-size: $font-size-small;
    &:focus {
      outline: none;
    }
  }
`;

const StyledTabButton = styled.button`
   {
    padding: 0;
    border: none;
    font: inherit;
    color: inherit;
    background-color: transparent;
    cursor: pointer;
    color: $brand-grey-light;
    text-transform: uppercase;
    font-family: $font-family-button;
    display: inline-block;
    padding: 0.5rem 1rem;
    border-radius: 0.1rem;
    border: none;
    background: transparent;
    margin-right: 0.1rem;
    font-size: $font-size-small;
    &:focus {
      outline: none;
    }
  }
`;

const StyledDiv = styled.div`
   {
    background: $brand-white;
    border-radius: 0.2rem;
  }
`;

// To prevent overflowing of large month names
timeFormatDefaultLocale({
  ...english,
  months: english.shortMonths,
});

export default class BondingCurve extends PureComponent {
  static propTypes = {
    defaultTab: PropTypes.string,
    contractAddress: PropTypes.string.isRequired,
    contractArtifact: PropTypes.object.isRequired,
    height: PropTypes.number,
    onError: PropTypes.func,
    onLoaded: PropTypes.func,
  };

  static defaultProps = {
    height: 200,
    onLoaded: () => {},
  };

  state = {
    activeTab: this.props.defaultTab || "timeline",
    error: false,
    web3: null,
    contract: null,
    loading: false,
  };

  toggleTab(tabName) {
    this.setState({
      activeTab: tabName,
    });
  }

  renderErrorComponent = error => {
    const { height, onError } = this.props;

    let message = error;
    let originalMessage = error;

    if (error.error || error.message) {
      originalMessage = error.message || error.error.message;
      console.error(error.message || error.error.message);
      message = "An error has occurred";
    } else {
      console.error(message);
    }

    if (onError) {
      onError(originalMessage);
      return null;
    }

    return <ErrorComponent message={message} height={height} />;
  };

  render() {
    return <StyledDiv>{this.renderContent()}</StyledDiv>;
  }

  renderContent = () => {
    const { activeTab, web3, error, loading, contract } = this.state;
    const { contractAddress, height } = this.props;

    if (loading) return <Loader style={{ minHeight: height }} />;

    const isActive = key => activeTab === key;

    const Tab = isActive("timeline") ? Timeline : BondingCurveChart;

    return (
      <React.Fragment>
        <StyledTabs>
          <StyledTab>
            <StyledTabButton onClick={this.toggleTab.bind(this, "timeline")}>Timeline</StyledTabButton>
          </StyledTab>
          <StyledTab>
            <StyledTabButton onClick={this.toggleTab.bind(this, "bonding-curve")}>Bonding Curve</StyledTabButton>
          </StyledTab>
        </StyledTabs>

        <ErrorBoundary FallbackComponent={this.renderErrorComponent}>
          {error ? this.renderErrorComponent(error) : null}

          {!error && (
            <div>
              <Tab
                key={activeTab}
                height={height}
                drizzle={this.props.drizzle}
                drizzleState={this.props.drizzleState}
              />
            </div>
          )}
        </ErrorBoundary>
      </React.Fragment>
    );
  };
}
