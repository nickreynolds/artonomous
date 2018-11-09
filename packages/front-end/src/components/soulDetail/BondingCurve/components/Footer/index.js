import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.8rem 0.8rem 0.8rem;
  min-height: 51.5px;
`;

const StyledFooterLeft = styled.div`
   {
    display: flex;
    align-items: center;
  }
`;

const StyledSymbol = styled.div`
   {
    background: $brand-black;
    width: 34px;
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    color: $brand-white;
    border-radius: 100%;
    font-size: 0.6rem;
  }
`;

const StyledPointDetail = styled.div`
  .data_point_detail {
    text-align: left;
  }
`;

const StyledDetailTitle = styled.div`
   {
    font-family: $font-family-title;
    font-size: $font-size-base;
    color: $brand-black;
  }
`;

const StyledDetailSub = styled.div`
   {
    font-family: $font-family-title;
    font-size: $font-size-mini;
    color: $brand-grey-light;
    padding-bottom: 0.3rem;
  }
`;

const Footer = ({ detail, children, symbol }) => (
  <StyledFooter>
    <StyledFooterLeft>
      {symbol && <StyledSymbol>{symbol}</StyledSymbol>}
      <StyledPointDetail>
        {detail && (
          <React.Fragment>
            {detail.title && <StyledDetailTitle>{detail.title}</StyledDetailTitle>}
            {detail.sub && <StyledDetailSub>{detail.sub}</StyledDetailSub>}
          </React.Fragment>
        )}
      </StyledPointDetail>
    </StyledFooterLeft>

    <div>{children || null}</div>
  </StyledFooter>
);

Footer.propTypes = {
  detail: PropTypes.shape({
    title: PropTypes.string,
    sub: PropTypes.string,
  }),
  children: PropTypes.any,
  symbol: PropTypes.string,
};

export default Footer;
