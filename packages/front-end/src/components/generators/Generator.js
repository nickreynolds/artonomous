import React, { Component } from "react";
import ArtPieceRendererContainer from "../artPiece/ArtPieceRendererContainer";
import NewContractForm from "../utility/NewContractForm";
import styled from "styled-components";
import GeneratorInfo from "./GeneratorInfo";
import BigNumber from "bignumber.js";
import { Slider, Card } from "material-ui";
import { connect } from "react-redux";
import { NumericInput } from "../utility/input/Input";
import { CurrencyInputWithButton } from "../utility/input/InputWithButton";
import { GeneratorRegistry } from "../../wrappers/contractWrappers";

const GeneratorInfoDiv = styled(Card)`
  display: flex;
  justify-content: space-around;
`;

const GeneratorDiv = styled(Card)`
  width: 400px;
  height: 650px;
`;

const SliderDiv = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  bottom: 0px;
`;

const InnerInputDiv = styled.div`
  max-width: 10%;
`;

const InnerSliderDiv = styled.div`
  max-width: 70%;
  min-width: 70%;
`;

const InnerButtonDiv = styled.div`
  max-width: 90%;
  min-width: 90%;
`;

const ArtDiv = styled.div`
  margin-right: 10px;
`;

class GeneratorsList extends Component {
  state = {
    showInfo: false,
    soulValue: this.props.userStake,
  };

  onInfoClick = () => {
    this.setState({ showInfo: !this.state.showInfo });
  };
  handleSoulSliderChange = (event, value) => {
    const value2 = BigNumber("1e18").times(
      BigNumber("1e-18")
        .times(value)
        .toFixed(4),
    );
    this.setState({ soulValue: value2 });
  };
  handleSoulInputChange = (event, value) => {
    this.setState({
      soulValue: BigNumber("1e18").times(value),
    });
  };
  componentDidUpdate(prevProps) {
    if (prevProps.userStake !== this.props.userStake) {
      this.setState({ soulValue: this.props.userStake });
    }
  }
  handleStakeButtonClicked = async () => {
    console.log("stake button clicked");
    if (BigNumber(this.state.soulValue).isGreaterThan(this.props.userStake)) {
      const amountToDeposit = BigNumber(this.state.soulValue).minus(BigNumber(this.props.userStake));

      await GeneratorRegistry.methods
        .depositStake(this.props.generator, amountToDeposit)
        .send({ from: this.props.account });
      console.log("deposit more.");
    } else if (BigNumber(this.state.soulValue).isLessThan(this.props.userStake)) {
      console.log("withdraw some");
      const amountToWithdraw = BigNumber(this.props.userStake).minus(BigNumber(this.state.soulValue));
      await GeneratorRegistry.methods
        .withdrawStake(this.props.generator, amountToWithdraw)
        .send({ from: this.props.account });
    }
  };
  render() {
    const { soulBalance, generator, stake, userStake } = this.props;
    const { soulValue } = this.state;

    const soulValue2 = BigNumber("1e18").times(soulValue);
    const showButton = !BigNumber(soulValue).isEqualTo(BigNumber(userStake));
    return (
      <GeneratorDiv>
        {stake && (
          <GeneratorInfoDiv>
            <span onClick={this.onInfoClick}>show info</span>
          </GeneratorInfoDiv>
        )}
        <br />

        {this.state.showInfo && (
          <div>
            <GeneratorInfo {...this.props} />
          </div>
        )}
        {!this.state.showInfo && (
          <div>
            <ArtDiv>
              <ArtPieceRendererContainer auctionData={{ generator }} />
            </ArtDiv>

            <SliderDiv>
              <InnerSliderDiv>
                <Slider
                  value={soulValue}
                  min={0}
                  max={BigNumber(soulBalance).plus(BigNumber(userStake))}
                  onChange={this.handleSoulSliderChange}
                />
              </InnerSliderDiv>
            </SliderDiv>
            <InnerButtonDiv />
            <CurrencyInputWithButton
              placeholder={BigNumber("1e-18").times(soulValue)}
              name="stake"
              buttonText="Update Stake"
              icon={<span>SOUL</span>}
              value={BigNumber("1e-18").times(soulValue)}
              onChange={this.handleSoulInputChange}
              onButtonClick={() => this.handleStakeButtonClicked()}
              showButton={showButton}
            />
            <span>
              Total SOUL Staked:{" "}
              {stake &&
                BigNumber("1e-18")
                  .times(stake)
                  .toString()}
            </span>
          </div>
        )}
      </GeneratorDiv>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { soulBalance, generatorStakes, generatorUserStakes, account } = state;
  let userStake;
  if (account && generatorUserStakes && generatorUserStakes.get(ownProps.generator)) {
    userStake = generatorUserStakes.get(ownProps.generator).get(account);
  }
  return {
    ...ownProps,
    account,
    soulBalance,
    stake: generatorStakes.get(ownProps.generator),
    userStake,
  };
};

export default connect(mapStateToProps)(GeneratorsList);
