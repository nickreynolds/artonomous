const GeneratorFactory = artifacts.require("./GeneratorFactory.sol");
// const GeneratorRegistry = artifacts.require("./GeneratorRegistry.sol");
// var SoulToken = artifacts.require("./SoulToken.sol");
// var TestDaiToken = artifacts.require("./TestDaiToken.sol");

module.exports = function(deployer, network, accounts) {
  return deployer.then(async () => {
    const factory = await GeneratorFactory.deployed();
    // console.log("factor: ", factory)
    await factory.createGenerator("initial generator", "QmU9dqYZbwAaN4STVN1nZ3PGRFvZe1G1cicGj1QhAtZRy6/upload.p5js");
    // let generator;
    // for (var i = 0; i < result.logs.length; i++) {
    //   const log = result.logs[i];
    //   if (log.event === "GeneratorCreated") {
    //     generator = log.args.generator;
    //   }
    // }
    // if (generator) {
    //   const token = await TestDaiToken.deployed();
    //   const soul = await SoulToken.deployed();
    //   const balance = await token.balanceOf(accounts[0]);
    //   console.log("accounts[0] balance: ", balance);
    //   console.log("here 1");
    //   await token.approve(soul.address, "1000", { from: accounts[0] });
    //   console.log("here 2");
    //   console.log("soul address: ", soul.address);
    //   await soul.buy("100", { from: accounts[0] });
    //   console.log("here 3");

    //   await soul.approve(registry.address, "1", { from: accounts[0] });
    //   console.log("here 4");
    //   await registry.depositStake(generator, "1", { from: accounts[0] });
    //   console.log("here 5");
    // }
  });
};
