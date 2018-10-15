var ArtPieceToken = artifacts.require("./ArtPieceToken.sol");

module.exports = function(deployer) {
  await deployer.deploy(ArtPieceToken, "ArtPieceToken", "ART");
};
