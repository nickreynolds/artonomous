var GeneratorRegistry = artifacts.require("./GeneratorRegistry.sol");
var Artonomous = artifacts.require("./Artonomous.sol");
var ArtPieceToken = artifacts.require("./ArtPieceToken.sol");
var SoulToken = artifacts.require("./SoulToken.sol");

module.exports = function(deployer, network, accounts) {
  console.log("GeneratorRegistry.address: ", GeneratorRegistry.address);
  console.log("ArtPieceToken.address: ", ArtPieceToken.address);
  console.log("SoulToken.address: ", SoulToken.address);
  deployer.deploy(Artonomous, GeneratorRegistry.address, ArtPieceToken.address, SoulToken.address);
};
