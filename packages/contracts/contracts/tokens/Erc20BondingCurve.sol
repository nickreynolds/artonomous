pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "./BancorFormula.sol";

/**
 * @title Bonding Curve
 * @dev Bonding curve contract based on Bacor formula
 * inspired by bancor protocol and simondlr
 * https://github.com/bancorprotocol/contracts
 * https://github.com/ConsenSys/curationmarkets/blob/master/CurationMarkets.sol
 * modified to use ERC20 as reserve currency instead of ETH
 */
contract Erc20BondingCurve is StandardToken, BancorFormula, Ownable {
  uint256 public poolBalance;
  StandardToken public reserveToken;

  constructor (address reserveTokenAddr) public {
    reserveToken = StandardToken(reserveTokenAddr);
  }

  /*
    reserve ratio, represented in ppm, 1-1000000
    1/3 corresponds to y= multiple * x^2
    1/2 corresponds to y= multiple * x
    2/3 corresponds to y= multiple * x^1/2
    multiple will depends on contract initialization,
    specificallytotalAmount and poolBalance parameters
    we might want to add an 'initialize' function that will allow
    the owner to send erc20 to the contract and mint a given amount of tokens
  */
  uint32 public reserveRatio;

  /*
    - Front-running attacks are currently mitigated by the following mechanisms:
    TODO - minimum return argument for each conversion provides a way to define a minimum/maximum price for the transaction
    - gas price limit prevents users from having control over the order of execution
  */
  uint256 public gasPrice = 0 wei; // maximum gas price for bancor transactions

  /**
   * @dev Buy tokens
   * gas ~ 77825
   * TODO implement maxAmount that helps prevent miner front-running
   */
  function buy(uint256 value) validGasPrice public returns(bool) {
    require(value > 0);
    require(reserveToken.transferFrom(msg.sender, this, value), "token transfer failure");
    uint256 tokensToMint = calculatePurchaseReturn(totalSupply_, poolBalance, reserveRatio, value);
    totalSupply_ = totalSupply_.add(tokensToMint);
    balances[msg.sender] = balances[msg.sender].add(tokensToMint);
    poolBalance = poolBalance.add(value);
    emit LogMint(msg.sender, tokensToMint, value);
    return true;
  }

  /**
   * @dev Sell tokens
   * gas ~ 86936
   * @param sellAmount Amount of tokens to withdraw
   * TODO implement maxAmount that helps prevent miner front-running
   */
  function sell(uint256 sellAmount) validGasPrice public returns(bool) {
    require(sellAmount > 0 && balances[msg.sender] >= sellAmount);
    uint256 reserveAmount = calculateSaleReturn(totalSupply_, poolBalance, reserveRatio, sellAmount);
    require(reserveToken.transfer(msg.sender, reserveAmount), "token transfer failure");
    poolBalance = poolBalance.sub(reserveAmount);
    balances[msg.sender] = balances[msg.sender].sub(sellAmount);
    totalSupply_ = totalSupply_.sub(sellAmount);
    emit LogWithdraw(msg.sender, sellAmount, reserveAmount);
    return true;
  }

  // verifies that the gas price is lower than the universal limit
  modifier validGasPrice() {
    assert(tx.gasprice <= gasPrice);
    _;
  }

  /**
    @dev Allows the owner to update the gas price limit
    @param _gasPrice The new gas price limit
  */
  function setGasPrice(uint256 _gasPrice) onlyOwner public {
    require(_gasPrice > 0);
    gasPrice = _gasPrice;
  }

  event LogMint(address sender, uint256 amountMinted, uint256 totalCost);
  event LogWithdraw(address sender, uint256 amountWithdrawn, uint256 reward);
  event LogBondingCurve(address sender, string logString, uint256 value);
}