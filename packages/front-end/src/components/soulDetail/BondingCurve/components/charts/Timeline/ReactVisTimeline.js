import React, { PureComponent } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import {
  AreaSeries,
  FlexibleWidthXYPlot,
  GradientDefs,
  LineSeries,
  MarkSeries,
  VerticalGridLines,
  XAxis,
} from "react-vis";
import styled from "styled-components";

const StyledChart = styled.div`
   {
    position: relative;
    overflow: hidden;
  }
`;

const StyledLineSeries = styled(LineSeries)`
   {
    stroke: $brand-pink !important;
  }
`;

const StyledVerticalGridLines = styled(VerticalGridLines)``;

const StyledMarkSeries = styled(MarkSeries)`
   {
    circle {
      fill: $brand-purple !important;
      stroke: $brand-white !important;
    }
  }
`;

export default class ReactVisTimeline extends PureComponent {
  state = {
    hoverValues: null,
  };

  static propTypes = {
    onShowDetail: PropTypes.func,
    minDomain: PropTypes.number,
    height: PropTypes.number.isRequired,
    data: PropTypes.array.isRequired,
  };

  _onMouseLeave = () => {
    console.log("mouse left");
    const { onShowDetail } = this.props;

    this.setState({ hoverValues: null });

    if (onShowDetail) {
      onShowDetail();
    }
  };

  _onNearestX = value => {
    console.log("mouse nearest x: ", value);
    const { onShowDetail } = this.props;

    this.setState({ hoverValues: [value] });

    if (onShowDetail) {
      onShowDetail(value);
    }
  };

  render() {
    const { hoverValues } = this.state;
    const { minDomain, height, data } = this.props;

    const domain = minDomain
      ? [
          minDomain,
          moment()
            .endOf("day")
            .valueOf(),
        ]
      : null;
    console.log("hoverValues: ", hoverValues);
    return (
      <StyledChart>
        <FlexibleWidthXYPlot
          margin={{ left: 0, right: 0, top: 10, bottom: 40 }}
          xType="time"
          animation
          onMouseLeave={this._onMouseLeave}
          height={height}
          xDomain={domain}
        >
          <LineSeries strokeWidth={3} style={{ strokeLinejoin: "round" }} onNearestX={this._onNearestX} data={data} />

          <GradientDefs>
            <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ff4092" stopOpacity={0.8} />
              <stop offset="90%" stopColor="white" stopOpacity={0} />
            </linearGradient>
          </GradientDefs>

          <AreaSeries color={"url(#oceanGradient)"} data={data} />

          {hoverValues && <VerticalGridLines tickValues={[hoverValues[0].x]} />}

          {hoverValues && <StyledMarkSeries size={4} data={hoverValues} />}

          {hoverValues && <XAxis tickTotal={6} />}
        </FlexibleWidthXYPlot>
      </StyledChart>
    );
  }
}
