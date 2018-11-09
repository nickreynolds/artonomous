import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { BigNumber } from "bignumber.js";
import numeral from "numeral";
import { calculateBuyPrice } from "../../../../../../util/bondingcurveCalculator";
import Footer from "../../Footer";
import Loader from "../../Loader";
import ReactVisBondingCurve from "./ReactVisBondingCurve";

export default class BondingCurveChart extends PureComponent {
  static propTypes = {
    bondingCurveContract: PropTypes.object.isRequired,
    web3: PropTypes.object.isRequired,
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
    console.log("did mount 1");
    try {
      this.setState({ loading: true });
      console.log("did mount. this.props.drizzle.contracts.SoulToken.: ", this.props.drizzle.contracts.SoulToken);

      //const dropsSupply = BN(await bondingCurveContract.methods.dropsSupply().call());
      //const scale = BN(await bondingCurveContract.methods.scale().call());
      const reserveRatioData = this.props.drizzle.contracts.SoulToken.methods.reserveRatio.cacheCall(); //).div(1000000);
      console.log("did mount 3");
      const poolBalanceData = this.props.drizzle.contracts.SoulToken.methods.poolBalance.cacheCall(); //().call()).div(
      //  1000000000000000000,
      //);
      console.log("did mount 4");
      const totalSupplyData = this.props.drizzle.contracts.SoulToken.methods.totalSupply.cacheCall();
      console.log("did mount 5");
      //const ndrops = BN(await bondingCurveContract.methods.ndrops().call());
      //const nOcean = BN(await bondingCurveContract.methods.nOcean().call()).div(scale);
      //const ghostSupply = BN(await bondingCurveContract.methods.ghostSupply().call());
      this.setState({ reserveRatioData, poolBalanceData, totalSupplyData });
    } catch (ex) {
      console.error("error in did mount: ", ex);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.drizzleState.contracts.SoulToken !== this.props.drizzleState.contracts.SoulToken) {
      const reserveRatioD = this.props.drizzleState.contracts.SoulToken.reserveRatio[this.state.reserveRatioData];
      const poolBalanceD = this.props.drizzleState.contracts.SoulToken.poolBalance[this.state.poolBalanceData];
      const totalSupplyD = this.props.drizzleState.contracts.SoulToken.totalSupply[this.state.totalSupplyData];
      if (reserveRatioD && poolBalanceD && totalSupplyD) {
        console.log("reserveRationD.value: ", reserveRatioD.value);
        console.log("poolBalanceD.value: ", poolBalanceD.value);
        console.log("totalSupplyD.value: ", totalSupplyD.value);
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
          console.log("error: ", error);
          this.setState({ error });
        }
      }
    }
  }

  getChartData({ totalSupply, reserveRatio, poolBalance, price: currentPrice }) {
    // TODO - remark - Not sure how much we should display

    /*
          * TODO - remark - Not sure if we need to display buy prices if supply < total supply like https://bondingcurves.relevant.community/
          * If so, we'll need to do something like this. The issue is that when doing this, we can't have a variable supply/pool balance to calculate the price.
          * When using a variable amount like relevant, the calculations didn't seem to be correct for me.
          * https://github.com/relevant-community/bonding-curve-component/blob/ceba574b9eb740715331e3124635b87b06c3790f/src/Chart.js#L31
          */

    const total = 100000;

    const step = Math.round(total / 100);
    const amount = BigNumber(step);

    let _supply = BigNumber(10);
    let _balance = BigNumber(1);

    const data = [];

    for (let i = step; i < total * 1.5; i += step) {
      const [tokens, price] = calculateBuyPrice({
        totalSupply: _supply,
        amount,
        poolBalance: _balance,
        reserveRatio,
      });

      _supply = _supply.plus(tokens);
      _balance = _balance.plus(amount);

      data.push({
        supply: _supply.toNumber(),
        sell: +price.toFixed(4),
        value: +price.toFixed(4),
      });
    }

    return { data, currentPrice: { supply: totalSupply, value: currentPrice } };
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
          symbol="OCN"
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
