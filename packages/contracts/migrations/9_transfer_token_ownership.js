var GeneratorRegistry = artifacts.require("./GeneratorRegistry.sol");
var Artonomous = artifacts.require("./Artonomous.sol");
var ArtPieceToken = artifacts.require("./ArtPieceToken.sol");

module.exports = function(deployer, network, accounts) {
  return deployer.then(async () => {
    const artPieceToken = await ArtPieceToken.deployed();
    console.log("artPieceToken.address: ", artPieceToken.address);
    const artonomous = await Artonomous.deployed();
    await artPieceToken.transferOwnership(artonomous.address);
  });
};
