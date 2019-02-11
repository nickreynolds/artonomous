var fs = require("fs");
var GeneratorRegistry = artifacts.require("./GeneratorRegistry.sol");
var Artonomous = artifacts.require("./Artonomous.sol");
var ArtPieceToken = artifacts.require("./ArtPieceToken.sol");
var SoulToken = artifacts.require("./SoulToken.sol");
var TestDaiToken = artifacts.require("./TestDaiToken.sol");

const config = JSON.parse(fs.readFileSync("../conf/config.json").toString());

module.exports = function(deployer, network, accounts) {
  console.log("GeneratorRegistry.address: ", GeneratorRegistry.address);
  console.log("ArtPieceToken.address: ", ArtPieceToken.address);
  console.log("SoulToken.address: ", SoulToken.address);
  let beneficiaryAddress = "0x";
  beneficiaryAddress = config.networks[network].beneficiary;
  deployer.deploy(
    Artonomous,
    GeneratorRegistry.address,
    ArtPieceToken.address,
    SoulToken.address,
    TestDaiToken.address,
    beneficiaryAddress,
  );
};
