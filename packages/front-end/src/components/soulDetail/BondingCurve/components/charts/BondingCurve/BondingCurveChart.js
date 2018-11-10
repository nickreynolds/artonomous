import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { BigNumber } from "bignumber.js";
import numeral from "numeral";
import Footer from "../../Footer";
import Loader from "../../Loader";
import ReactVisBondingCurve from "./ReactVisBondingCurve";

export default class BondingCurveChart extends PureComponent {
  static propTypes = {
    height: PropTypes.number.isRequired,
  };

  state = {
    params: {},
    loading: false,
    data: [],
    selectedItem: null,
    currentPrice: {
      value: 0,
      supply: 0,
    },
    reserveRatioData: null,
    poolBalanceData: null,
    totalSupplyData: null,
  };

  async componentDidMount() {
    try {
      this.setState({ loading: true });
      const reserveRatioData = this.props.drizzle.contracts.SoulToken.methods.reserveRatio.cacheCall();
      const poolBalanceData = this.props.drizzle.contracts.SoulToken.methods.poolBalance.cacheCall();
      const totalSupplyData = this.props.drizzle.contracts.SoulToken.methods.totalSupply.cacheCall();
      this.setState({ reserveRatioData, poolBalanceData, totalSupplyData });
      this.update();
    } catch (ex) {
      console.error("error in did mount: ", ex);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.drizzleState.contracts.SoulToken !== this.props.drizzleState.contracts.SoulToken) {
      this.update();
    }
  }
  update() {
    const reserveRatioD = this.props.drizzleState.contracts.SoulToken.reserveRatio[this.state.reserveRatioData];
    const poolBalanceD = this.props.drizzleState.contracts.SoulToken.poolBalance[this.state.poolBalanceData];
    const totalSupplyD = this.props.drizzleState.contracts.SoulToken.totalSupply[this.state.totalSupplyData];
    if (reserveRatioD && poolBalanceD && totalSupplyD) {
      const reserveRatio = BigNumber(reserveRatioD.value.toString()).div(1000000);
      const poolBalance = BigNumber(poolBalanceD.value).div(1000000000000000000);
      const totalSupply = BigNumber(totalSupplyD.value);
      try {
        const params = {
          reserveRatio,
          poolBalance,
          totalSupply,
          price: poolBalance.div(totalSupply.times(reserveRatio)).toNumber(),
        };

        const { data, currentPrice } = this.getChartData(params);

        this.setState({
          params,
          data,
          currentPrice,
          loading: false,
        });
      } catch (error) {
        console.error("error: ", error);
        this.setState({ error });
      }
    }
  }

  calculateSaleReturn({ totalSupply, poolBalance, reserveRatio, amount }) {
    if (!totalSupply || !poolBalance || !reserveRatio || !amount) return "0";

    if (totalSupply === 0 || reserveRatio === 0 || poolBalance === 0 || amount === 0) return "0";
    if (amount === totalSupply) return poolBalance;
    if (reserveRatio === 1) return poolBalance;

    let result = poolBalance * (1 - (1 - amount / totalSupply) ** (1 / reserveRatio));
    return result;
  }

  calculateBuyPrice({ totalSupply, poolBalance, reserveRatio, amount }) {
    if (!totalSupply || !poolBalance || !reserveRatio || !amount) return "0";
    if (totalSupply === 0 || reserveRatio === 0 || poolBalance === 0 || amount === 0) return "0";
    let result = poolBalance * ((1 + amount / totalSupply) ** (1 / reserveRatio) - 1);
    return result;
  }

  getChartData({ totalSupply, reserveRatio, poolBalance }) {
    let data = [];
    let step = Math.round(totalSupply / 100);
    let price = poolBalance / (reserveRatio * totalSupply);
    let currentPrice = { supply: totalSupply, value: price };

    for (let i = step; i < totalSupply * 1.5; i += step) {
      if (i < totalSupply) {
        let eth = 1 * this.calculateSaleReturn({ poolBalance, totalSupply, reserveRatio, amount: totalSupply - i });
        price = (parseFloat(poolBalance, 10) - eth) / (reserveRatio * i);
        data.push({ supply: i, sell: price, value: price });
      } else if (i > totalSupply) {
        let eth = 1 * this.calculateBuyPrice({ poolBalance, totalSupply, reserveRatio, amount: i - totalSupply });
        price = (eth + parseFloat(poolBalance, 10)) / (reserveRatio * i);
        data.push({ supply: 1 * i, buy: price, value: 1 * price });
      }
    }
    return { data, currentPrice };
  }

  setDetail = selectedItem => {
    this.setState({ selectedItem });
  };

  render() {
    const { data, loading, selectedItem, currentPrice, error } = this.state;
    const { height } = this.props;

    if (error) throw error;

    return (
      <div>
        {loading ? (
          <Loader style={{ minHeight: height }} />
        ) : (
          <div style={{ minHeight: height }}>
            <ReactVisBondingCurve data={data} onShowDetail={this.setDetail} height={200} />
          </div>
        )}

        <Footer
          symbol="ETH"
          detail={{
            title: `${selectedItem ? selectedItem.value : currentPrice.value.toFixed(4)}`,
            sub: selectedItem
              ? `Supply: ${numeral(selectedItem.supply).format("0,0")}`
              : `Total supply: ${numeral(currentPrice.supply).format("0,0")}`,
          }}
        />
      </div>
    );
  }
}
