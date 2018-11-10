import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import moment from "moment";
import Footer from "../../Footer";
import ReactVisTimeline from "./ReactVisTimeline";
import { getWeb3 } from "../../../../../../util/web3/getWeb3";
import styled from "styled-components";

const StyledFilterUL = styled.ul`
   {
    color: $brand-grey-light;
    list-style-type: none;
    display: flex;
    margin: 0;
    padding: 0;
    font-family: $font-family-button;
    font-size: 0.8rem;
  }
`;

const StyledFilterLI = styled.li`
   {
    padding: 0.3rem;
    opacity: 0.6;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }

    &.active {
      color: $brand-black;
      opacity: 1;
    }
  }
`;

export default class Timeline extends PureComponent {
  static propTypes = {
    height: PropTypes.number.isRequired,
  };

  state = {
    minDomain: 0,
    selectedItem: null,
    data: [],
    activeFilter: "MAX",
    maxValue: 0,
    error: null,
  };

  filters = ["1D", "5D", "1M", "1Y", "MAX"];

  async componentDidMount() {
    try {
      await this.getData(this.props);
    } catch (error) {
      this.setState({ error });
    }
  }

  async componentDidUpdate(prevProps) {
    try {
      if (
        prevProps.contractAddress !== this.props.contractAddress ||
        prevProps.drizzleState.contracts.SoulToken.events !== this.props.drizzleState.contracts.SoulToken.events
      ) {
        this.setState(
          {
            data: [],
          },
          () => {
            this.getData(this.props);
          },
        );
      }
    } catch (error) {
      this.setState({ error });
    }
  }

  getData = async () => {
    this.setState({ data: [], maxValue: 0 });
    const scale = 1;
    const web3 = await getWeb3();
    const thingy = this;
    const events = this.props.drizzleState.contracts.SoulToken.events;
    events.forEach(async event => {
      const price = event.returnValues[2] / event.returnValues[1] / scale;
      const block = await web3.eth.getBlock(event.blockNumber);

      const date = moment(block.timestamp * 1000).valueOf();

      let newMaxValue = this.state.maxValue;

      if (price > this.state.maxValue) {
        newMaxValue = price;
      }

      thingy.setState(prevState => ({
        data: [
          ...prevState.data,
          {
            y: +price,
            x: date,
          },
        ].sort((a, b) => {
          if (a.x === b.x) {
            return a.y - b.y;
          } else {
            return a.x - b.x;
          }
        }),
        maxValue: newMaxValue,
      }));
    });
  };

  setFilter = filter => {
    let minDomain = 0;

    if (filter !== "MAX") {
      const duration = moment.duration(`P${filter}`);
      minDomain = moment()
        .subtract(duration)
        .valueOf();
    }

    this.setState({
      activeFilter: filter,
      minDomain,
    });
  };

  setDetail = selectedItem => {
    this.setState({ selectedItem });
  };

  render() {
    const { activeFilter, selectedItem, minDomain, data, maxValue } = this.state;
    const { height } = this.props;

    if (this.state.error) throw this.state.error;

    const detail = selectedItem || data.slice(-1)[0];

    return (
      <div>
        <div style={{ minHeight: height }}>
          <ReactVisTimeline
            activeFilter={activeFilter}
            minDomain={minDomain}
            maxValue={maxValue}
            height={height}
            onShowDetail={this.setDetail}
            data={data}
          />
        </div>

        <Footer
          symbol="ETH"
          detail={
            detail
              ? {
                  title: `${detail.y.toFixed(20)}`,
                  sub: moment(detail.x).format("lll"),
                }
              : null
          }
        >
          <StyledFilterUL>
            {this.filters.map(filter => (
              <StyledFilterLI key={filter} active={filter === activeFilter} onClick={this.setFilter.bind(this, filter)}>
                {filter}
              </StyledFilterLI>
            ))}
          </StyledFilterUL>
        </Footer>
      </div>
    );
  }
}
