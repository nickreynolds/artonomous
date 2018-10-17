const GeneratorRegistry = artifacts.require("./GeneratorRegistry.sol");
const GeneratorContract = artifacts.require("./Generator.sol");
const GeneratorFactory = artifacts.require("./GeneratorFactory.sol");

module.exports = function(deployer) {
  return deployer.then(async () => {
    const factory = await GeneratorFactory.deployed();
    await factory.createGenerator("initial generator", "bad-url");
  });
};
