import * as React from "react";
import { Link } from "react-router-dom";
import styled, { StyledComponentClass } from "styled-components";

import { colors, fonts } from "../styleConstants";

export const SMALL = "SMALL";
export const MEDIUM = "MEDIUM";
export const MEDIUM_WIDE = "MEDIUM_WIDE";
export const LARGE = "LARGE";

const PRIMARY_BUTTON_DEFAULT_THEME = {
  primaryButtonBackground: colors.accent.ARTONOMOUS_BLUE,
  primaryButtonColor: colors.basic.WHITE,
  primaryButtonFontWeight: "normal",
  primaryButtonHoverBackground: colors.accent.ARTONOMOUS_BLUE_FADED,
  primaryButtonDisabledBackground: colors.accent.ARTONOMOUS_BLUE_VERY_FADED,
  primaryButtonDisabledColor: colors.basic.WHITE,
  primaryButtonTextTransform: "uppercase",
  sansSerifFont: fonts.SANS_SERIF,
};

const INVERTED_BUTTON_DEFAULT_THEME = {
  invertedButtonBackground: colors.basic.WHITE,
  invertedButtonColor: colors.accent.ARTONOMOUS_BLUE,
};

const SECONDARY_BUTTON_DEFAULT_THEME = {
  secondaryButtonBackground: colors.basic.WHITE,
  secondaryButtonColor: colors.accent.ARTONOMOUS_GRAY_2,
  secondaryButtonBorder: colors.accent.ARTONOMOUS_GRAY_3,
  secondaryButtonHoverBackground: colors.accent.ARTONOMOUS_BLUE,
  secondaryButtonHoverColor: colors.basic.WHITE,
};

const DARK_BUTTON_DEFAULT_THEME = {
  darkButtonBackground: colors.primary.BLACK,
  darkButtonColor: colors.basic.WHITE,
  darkButtonHoverColor: colors.basic.WHITE,
  darkButtonHoverBackground: colors.accent.ARTONOMOUS_GRAY_1,
  darkButtonTextTransform: "none",
};

const BORDERLESS_BUTTON_DEFAULT_THEME = {
  borderlessButtonColor: colors.primary.ARTONOMOUS_BLUE_1,
  borderlessButtonHoverColor: colors.accent.ARTONOMOUS_BLUE_FADED,
};

export const DEFAULT_BUTTON_THEME = {
  ...PRIMARY_BUTTON_DEFAULT_THEME,
  ...INVERTED_BUTTON_DEFAULT_THEME,
  ...SECONDARY_BUTTON_DEFAULT_THEME,
  ...DARK_BUTTON_DEFAULT_THEME,
  ...BORDERLESS_BUTTON_DEFAULT_THEME,
};

const sizesObject = {
  [SMALL]: "8px 12px",
  [MEDIUM]: "10px 25px",
  [MEDIUM_WIDE]: "9px 30px",
  [LARGE]: "20px 50px",
};

const spacingObject = {
  [SMALL]: "0.5px",
  [MEDIUM]: "1px",
  [MEDIUM_WIDE]: "0.2px",
  [LARGE]: "3px",
};

const fontObject = {
  [SMALL]: "12px",
  [MEDIUM]: "18px",
  [MEDIUM_WIDE]: "14px",
  [LARGE]: "24px",
};

export const ButtonComponent = props => {
  const activeClass = props.active ? " active" : "";
  const disabledClass = props.disabled ? " disabled" : "";
  const { children, className, onClick, disabled, to, href, target, inputRef } = props;

  if (to) {
    return (
      <Link {...props} className={className + activeClass + disabledClass} to={to} ref={inputRef}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a {...props} className={className + activeClass + disabledClass} href={href} target={target} ref={inputRef}>
        {children}
      </a>
    );
  }

  return (
    <button
      {...props}
      className={className + activeClass + disabledClass}
      onClick={onClick}
      type="button"
      disabled={disabled}
      ref={inputRef}
    >
      {children}
    </button>
  );
};

const BaseButton = styled(ButtonComponent)`
  text-decoration: none;
  border-radius: 2px;
  padding: ${props => sizesObject[props.size || LARGE]};
  font-family: ${props => props.theme.sansSerifFont};
  cursor: pointer;
  border: none;
  letter-spacing: ${props => spacingObject[props.size || LARGE]};
  font-size: ${props => fontObject[props.size || LARGE]};
  transition: background-color 500ms;
  outline: none;
  display: inline-block;
  ${props => (props.width ? `width: ${props.width}px;` : "")};
  ${props => (props.fullWidth ? "width: 100%;" : "")};
`;

export const Button = styled(BaseButton)`
  background-color: ${props => props.theme.primaryButtonBackground};
  color: ${props => props.theme.primaryButtonColor};
  font-weight: ${props => props.theme.primaryButtonFontWeight};
  text-transform: ${props => (props.textTransform ? props.textTransform : props.theme.primaryButtonTextTransform)};
  &:focus,
  &:active,
  &:hover {
    background-color: ${props => props.theme.primaryButtonHoverBackground};
    color: ${props => props.theme.primaryButtonColor};
  }
  &:disabled {
    background-color: ${props => props.theme.primaryButtonDisabledBackground};
    color: ${props => props.theme.primaryButtonDisabledColor};
  }
`;

Button.defaultProps = {
  theme: PRIMARY_BUTTON_DEFAULT_THEME,
};

export const InvertedButton = styled(BaseButton)`
  text-transform: uppercase;
  background-color: ${props => props.theme.invertedButtonBackground};
  color: ${props => props.theme.invertedButtonColor};
  border: 2px solid ${props => props.theme.invertedButtonColor};
  &:focus,
  &:active,
  &:hover {
    background-color: ${props => props.theme.invertedButtonColor};
    color: ${props => props.theme.invertedButtonBackground};
  }
`;

InvertedButton.defaultProps = {
  theme: INVERTED_BUTTON_DEFAULT_THEME,
};

export const SecondaryButton = styled(BaseButton)`
  background-color: ${props => props.theme.secondaryButtonBackground};
  color: ${props => props.theme.secondaryButtonColor};
  border: 1px solid ${props => props.theme.secondaryButtonBorder};
  &:focus,
  &:hover,
  &.active {
    background-color: ${props => props.theme.secondaryButtonHoverBackground};
    border: 1px solid ${props => props.theme.secondaryButtonHoverBackground};
    color: ${props => props.theme.secondaryButtonHoverColor};
  }
`;

SecondaryButton.defaultProps = {
  theme: SECONDARY_BUTTON_DEFAULT_THEME,
};

export const DarkButton = styled(BaseButton)`
  background-color: ${props => props.theme.darkButtonBackground};
  color: ${props => props.theme.darkButtonColor};
  text-transform: ${props => props.theme.darkButtonTextTransform};
  &:focus,
  &:hover,
  &.active {
    color: ${props => props.theme.darkButtonHoverColor};
    background-color: ${props => props.theme.darkButtonHoverBackground};
  }
`;

DarkButton.defaultProps = {
  theme: DARK_BUTTON_DEFAULT_THEME,
};

export const CancelButton = styled(SecondaryButton)`
  color: ${colors.accent.ARTONOMOUS_BLUE};
  border: none;
  &:focus,
  &:active,
  &:hover {
    background-color: ${colors.accent.ARTONOMOUS_RED_VERY_FADED};
    border: none;
    color: ${colors.accent.ARTONOMOUS_RED};
  }
`;

export const BorderlessButton = styled(Button)`
  border: none;
  font-family: ${props => props.theme.sansSerifFont};
  color: ${props => props.theme.borderlessButtonColor};
  font-weight: 700;
  margin-left: 8px;
  letter-spacing: 0.7px;
  padding: ${sizesObject[SMALL]};
  font-size: 15px;
  background-color: transparent;
  &:focus,
  &:active,
  &:hover {
    background-color: transparent;
    color: ${props => props.theme.borderlessButtonHoverColor};
  }
`;

BorderlessButton.defaultProps = {
  theme: BORDERLESS_BUTTON_DEFAULT_THEME,
};
