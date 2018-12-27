pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

contract TestDaiToken is StandardToken {
  string public constant name = "TestDai";
  string public constant symbol = "TDAI";
  uint8 public constant decimals = 18;
  uint256 public constant initialAmount = 50000000000000000000000000;

  constructor() public StandardToken() {
    balances[msg.sender] = initialAmount;
  }
}