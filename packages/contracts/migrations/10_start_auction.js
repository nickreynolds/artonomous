var GeneratorRegistry = artifacts.require("./GeneratorRegistry.sol");
var Artonomous = artifacts.require("./Artonomous.sol");
var ArtPieceToken = artifacts.require("./ArtPieceToken.sol");

module.exports = function(deployer, network, accounts) {
  return deployer.then(async () => {
    const artonomous = await Artonomous.deployed();
    await artonomous.startAuction(10000000000000000, 0);
  });
};
