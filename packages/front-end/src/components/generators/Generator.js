import React, { Component } from "react";
import ArtPieceRendererContainer from "../artPiece/ArtPieceRendererContainer";
import styled from "styled-components";
import GeneratorInfo from "./GeneratorInfo";
import BigNumber from "bignumber.js";
import { Slider, Card } from "material-ui";
import { connect } from "react-redux";
import { CurrencyInputWithButton } from "../utility/input/InputWithButton";
import { GeneratorRegistry, SoulToken } from "../../wrappers/contractWrappers";
import { FormattedCurrency } from "../utility/FormattedCurrency";
import { Link } from "react-router";

const GeneratorInfoDiv = styled(Card)`
  display: flex;
  justify-content: space-around;
`;

const GeneratorDiv = styled(Card)`
  width: 400px;
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
  margin-left: 10px;
`;

const GeneratorNameDiv = styled.div`
  margin-left: 10px;
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
    if (BigNumber(this.state.soulValue).isGreaterThan(this.props.userStake)) {
      const amountToDeposit = BigNumber(this.state.soulValue).minus(BigNumber(this.props.userStake));

      if (BigNumber(this.props.soulUserRegistryApprovalBalance).isLessThan(amountToDeposit)) {
        await SoulToken.methods.approve(GeneratorRegistry._address, amountToDeposit).send({ from: this.props.account });
      }
      await GeneratorRegistry.methods
        .depositStake(this.props.generator, amountToDeposit)
        .send({ from: this.props.account });
    } else if (BigNumber(this.state.soulValue).isLessThan(this.props.userStake)) {
      const amountToWithdraw = BigNumber(this.props.userStake).minus(BigNumber(this.state.soulValue));
      await GeneratorRegistry.methods
        .withdrawStake(this.props.generator, amountToWithdraw)
        .send({ from: this.props.account });
    }
  };
  render() {
    const { soulBalance, generator, stake, userStake, auctions, historicalAuctions } = this.props;
    const { soulValue } = this.state;

    const showButton = !BigNumber(soulValue).isEqualTo(BigNumber(userStake));
    const maxStake = BigNumber(soulBalance).plus(BigNumber(userStake));
    let totalProceeds = new BigNumber(0);
    if (auctions && historicalAuctions) {
      auctions.map(id => {
        const auction = historicalAuctions.get(id);
        const buyPrice = auction.price;
        totalProceeds = totalProceeds.plus(new BigNumber(buyPrice));
      });
    }
    const generatorLink = "/generator/" + this.props.generator;
    const showInfoText = this.state.showInfo ? "hide code" : "show code";
    return (
      <GeneratorDiv>
        {stake && (
          <GeneratorInfoDiv>
            <span onClick={this.onInfoClick}>{showInfoText}</span>
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
            <GeneratorNameDiv>
              <Link to={generatorLink}>{this.props.name}</Link>
            </GeneratorNameDiv>
            <ArtDiv>
              <ArtPieceRendererContainer auctionData={{ generator }} hash={this.props.hash} />
            </ArtDiv>

            <SliderDiv>
              <InnerSliderDiv>
                <Slider value={soulValue} min={0} max={maxStake.toNumber()} onChange={this.handleSoulSliderChange} />
              </InnerSliderDiv>
            </SliderDiv>
            <InnerButtonDiv />
            <CurrencyInputWithButton
              placeholder={BigNumber("1e-18").times(soulValue)}
              name="stake"
              buttonText="Update Stake"
              icon={<span />}
              value={BigNumber("1e-18").times(soulValue)}
              onChange={this.handleSoulInputChange}
              onButtonClick={() => this.handleStakeButtonClicked()}
              showButton={showButton}
            />
            <span>Total Stake: {stake && <FormattedCurrency value={stake} type={"SOUL"} />}</span>
            <span>Total Proceeds: {totalProceeds && <FormattedCurrency value={totalProceeds} type={"DAI"} />}</span>
          </div>
        )}
      </GeneratorDiv>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    soulBalance,
    generatorStakes,
    generatorNames,
    generatorUserStakes,
    account,
    soulUserRegistryApprovalBalance,
    historicalAuctionsByGenerator,
    historicalAuctions,
  } = state;
  let userStake;
  if (account && generatorUserStakes && generatorUserStakes.get(ownProps.generator)) {
    userStake = generatorUserStakes.get(ownProps.generator).get(account);
  }
  return {
    ...ownProps,
    account,
    soulBalance,
    stake: generatorStakes.get(ownProps.generator),
    name: generatorNames.get(ownProps.generator),
    auctions: historicalAuctionsByGenerator.get(ownProps.generator),
    historicalAuctions,
    userStake,
    soulUserRegistryApprovalBalance,
  };
};

export default connect(mapStateToProps)(GeneratorsList);
