const GeneratorRegistry = artifacts.require("./GeneratorRegistry.sol");
const GeneratorContract = artifacts.require("./Generator.sol");
const GeneratorFactory = artifacts.require("./GeneratorFactory.sol");

module.exports = function(deployer) {
  return deployer.then(async () => {
    const registry = await GeneratorRegistry.deployed();
    await deployer.deploy(GeneratorContract);
    const generator = await GeneratorContract.deployed();
    await deployer.deploy(GeneratorFactory, registry.address, generator.address);
    const factory = await GeneratorFactory.deployed();
    // console.log("factor: ", factory)
    // await factory.createGenerator("initial generator", "QmU9dqYZbwAaN4STVN1nZ3PGRFvZe1G1cicGj1QhAtZRy6/upload.p5js");

  });
};
