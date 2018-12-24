var Migrations = artifacts.require("./Migrations.sol");

module.exports = async function(deployer) {
  console.log("i am the first me.");
  await deployer.deploy(Migrations);
};
