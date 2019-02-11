import * as React from "react";
import styled, { StyledComponentClass } from "styled-components";

import { colors, fonts } from "../../styleConstants";
import { InvertedButton, SMALL, ButtonComponent } from "../Button";

import { NumericInput, TextInput } from "./Input";

const StyledTextInputButton = styled("div")`
  border: 1px solid;
  border-color: ${props => (props.isFocused ? colors.accent.ARTONOMOUS_BLUE : colors.accent.ARTONOMOUS_GRAY_3)};
  border-radius: 3px;
  font-size: 21px;
  padding: 26px 20px;
  position: relative;

  & > div {
    margin: 0;
  }

  & > div > input,
  & > div > input:focus {
    border: none;
    margin: 0;
    padding: 0;
  }
`;

const StyledIcon = styled.div`
  color: ${colors.accent.ARTONOMOUS_GRAY_2};
  font-family: ${fonts.SANS_SERIF};
  font-size: 18px;
  line-height: 21px;
  position: absolute;
  right: 40px;
  top: 29px;
`;

const StyledButtonContainer = styled.div`
  position: absolute;
  right: 40px;
  top: 22px;
`;

class InputWithButtonContainer extends React.Component {
  inputElement = undefined;
  buttonElement = undefined;

  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
    };
  }

  render() {
    return (
      <StyledTextInputButton {...this.state}>
        {this.props.children(this.state.isFocused, this.setFocused, this.setUnfocused, this.setInputRef)}
        {this.props.showButton && (
          <StyledButtonContainer>
            <ButtonComponent size={SMALL} onClick={this.handleButtonClick} inputRef={this.setButtonRef}>
              {this.props.buttonText}
            </ButtonComponent>
          </StyledButtonContainer>
        )}
        {!this.state.isFocused && this.props.icon && <StyledIcon>{this.props.icon}</StyledIcon>}
      </StyledTextInputButton>
    );
  }

  handleButtonClick = ev => {
    this.props.onButtonClick(ev);
    if (this.inputElement) {
      this.inputElement.blur();
      this._setUnfocused();
    }
  };

  setFocusState = isFocused => {
    this.setState(() => ({ isFocused }));
  };

  setFocused = () => this.setFocusState(true);

  _setUnfocused = () => this.setFocusState(false);

  etUnfocused = ev => {
    if (ev.relatedTarget === this.buttonElement) {
      ev.preventDefault();
    } else {
      this._setUnfocused();
    }
  };

  setInputRef = el => (this.inputElement = el);
  setButtonRef = el => (this.buttonElement = el);
}

export const TextInputWithButton = props => {
  const { onButtonClick, icon, buttonText, ...restProps } = props;
  const inputProps = { ...restProps, noLabel: true };
  const containerProps = { onButtonClick, buttonText, icon };

  return (
    <InputWithButtonContainer {...containerProps}>
      {(isFocused, setFocused, setUnfocused, setInputRef) => {
        return <TextInput {...inputProps} onFocus={setFocused} onBlur={setUnfocused} inputRef={setInputRef} />;
      }}
    </InputWithButtonContainer>
  );
};

export const CurrencyInputWithButton = props => {
  const { onButtonClick, icon, buttonText, showButton, ...restProps } = props;
  const inputProps = { ...restProps, noLabel: true };
  const containerProps = { onButtonClick, buttonText, icon, showButton };

  return (
    <InputWithButtonContainer {...containerProps}>
      {(isFocused, setFocused, setUnfocused, setInputRef) => {
        return <NumericInput {...inputProps} onFocus={setFocused} onBlur={setUnfocused} inputRef={setInputRef} />;
      }}
    </InputWithButtonContainer>
  );
};
