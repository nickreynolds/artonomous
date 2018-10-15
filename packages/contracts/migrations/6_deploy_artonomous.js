var GeneratorRegistry = artifacts.require("./GeneratorRegistry.sol");
var Artonomous = artifacts.require("./Artonomous.sol");
var ArtPieceToken = artifacts.require("./ArtPieceToken.sol");

module.exports = async function(deployer, network, accounts) {
  let beneficiary = accounts[0];
  console.log("GeneratorRegistry.address: ", GeneratorRegistry.address);
  console.log("ArtPieceToken.address: ", ArtPieceToken.address);
  await deployer.deploy(Artonomous, GeneratorRegistry.address, ArtPieceToken.address);

  const artPieceToken = await ArtPieceToken.deployed();
  const artonomous = await Artonomous.deployed();
  await artPieceToken.transferOwnership(artonomous.address);

  await artonomous.startAuction();
};
