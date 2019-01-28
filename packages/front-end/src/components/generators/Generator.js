import React, { Component } from "react";
import ArtPieceRendererContainer from "../artPiece/ArtPieceRendererContainer";
import NewContractForm from "../utility/NewContractForm";
import styled from "styled-components";
import GeneratorInfo from "./GeneratorInfo";
import BigNumber from "bignumber.js";
import { Slider, Card } from "material-ui";
import { connect } from "react-redux";

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

class GeneratorsList extends Component {
  state = {
    showInfo: false,
    soulValue: 0,
  };

  onInfoClick = () => {
    this.setState({ showInfo: !this.state.showInfo });
  };
  handleSoulSliderChange = (event, value) => {
    this.setState({ soulValue: value });
  };
  render() {
    const { soulBalance, generator, stake } = this.props;
    const { soulValue } = this.state;

    const soulValue2 = BigNumber("1e18").times(soulValue);

    return (
      <GeneratorDiv>
        {stake && (
          <GeneratorInfoDiv>
            <span>SOUL Staked: {stake}</span>
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
            <ArtPieceRendererContainer auctionData={{ generator }} />

            <SliderDiv>
              <InnerSliderDiv>
                <Slider value={soulValue} min={0} max={soulBalance} onChange={this.handleSoulSliderChange} />
              </InnerSliderDiv>
            </SliderDiv>
            <InnerButtonDiv />
          </div>
        )}
      </GeneratorDiv>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { soulBalance, generatorStakes } = state;
  console.log("ownProps: ", ownProps);
  console.log("generatorStakes: ", generatorStakes);
  return {
    ...ownProps,
    soulBalance,
    stake: generatorStakes.get(ownProps.generator),
  };
};

export default connect(mapStateToProps)(GeneratorsList);
