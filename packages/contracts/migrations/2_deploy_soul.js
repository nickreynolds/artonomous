var SoulToken = artifacts.require("./SoulToken.sol");

module.exports = function(deployer) {
  deployer.deploy(SoulToken);
};
