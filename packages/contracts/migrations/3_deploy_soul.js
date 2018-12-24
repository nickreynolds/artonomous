var SoulToken = artifacts.require("./SoulToken.sol");
var TestDaiToken = artifacts.require("./TestDaiToken.sol");

module.exports = function(deployer) {
  console.log("test dai address: ", TestDaiToken.address);
  deployer.deploy(SoulToken, TestDaiToken.address);
};
