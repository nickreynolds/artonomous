pragma solidity ^0.4.24;

import "./Erc20BondingCurve.sol";

contract SoulToken is Erc20BondingCurve {
  string public constant name = "SoulToken";
  string public constant symbol = "SOL";
  uint8 public constant decimals = 18;

  uint256 public constant INITIAL_SUPPLY = 2000000 * (10 ** 18);
  uint256 public constant INITIAL_PRICE = 40 * (10 ** 16);
  uint32 public constant CURVE_RATIO = 350000;
  uint256 public constant INITAL_BALANCE = CURVE_RATIO * INITIAL_SUPPLY * INITIAL_PRICE / (1000000 * 10 ** 18);

  constructor(address reserveTokenAddr) public Erc20BondingCurve(reserveTokenAddr) {
    reserveRatio = CURVE_RATIO;
    totalSupply_ = INITIAL_SUPPLY;
    poolBalance = INITAL_BALANCE;
    gasPrice = 26 * (10 ** 9);
  }

  function depositArtPayment(uint256 value) public {
    require(reserveToken.transferFrom(msg.sender, this, value), "token transfer failure");
    poolBalance += value;
  }
}