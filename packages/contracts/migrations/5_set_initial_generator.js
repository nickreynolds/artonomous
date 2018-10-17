const GeneratorFactory = artifacts.require("./GeneratorFactory.sol");

module.exports = function(deployer) {
  return deployer.then(async () => {
    const factory = await GeneratorFactory.deployed();
    await factory.createGenerator("initial generator", "QmU9dqYZbwAaN4STVN1nZ3PGRFvZe1G1cicGj1QhAtZRy6/upload.p5js");
  });
};
