var GeneratorRegistry = artifacts.require("./GeneratorRegistry.sol");
var Artonomous = artifacts.require("./Artonomous.sol");

module.exports = function(deployer, network, accounts) {
  let beneficiary = accounts[0];
  console.log("beneficiary: ", beneficiary);
  deployer.deploy(Artonomous, GeneratorRegistry.address, beneficiary);
};
