var GeneratorRegistry = artifacts.require("./GeneratorRegistry.sol");
var Artonomous = artifacts.require("./Artonomous.sol");
var ArtPieceToken = artifacts.require("./ArtPieceToken.sol");

module.exports = function(deployer, network, accounts) {
  console.log("GeneratorRegistry.address: ", GeneratorRegistry.address);
  console.log("ArtPieceToken.address: ", ArtPieceToken.address);
  await deployer.deploy(Artonomous, GeneratorRegistry.address, ArtPieceToken.address);
};
