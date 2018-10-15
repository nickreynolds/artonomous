var GeneratorRegistry = artifacts.require("./GeneratorRegistry.sol");
var Artonomous = artifacts.require("./Artonomous.sol");
var ArtPieceToken = artifacts.require("./ArtPieceToken.sol");

module.exports = async function(deployer, network, accounts) {
  let beneficiary = accounts[0];
  const artPieceToken = await ArtPieceToken.deployed();
  const generatorRegistry = await GeneratorRegistry.deployed();
  console.log("beneficiary: ", beneficiary);
  console.log("ArtPieceToken.address", ArtPieceToken.address);
  deployer.deploy(Artonomous, generatorRegistry.address, beneficiary, artPieceToken.address);
};
