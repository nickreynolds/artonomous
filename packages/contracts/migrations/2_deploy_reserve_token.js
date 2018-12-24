var fs = require("fs");
var TestDaiToken = artifacts.require("./TestDaiToken.sol");

const config = JSON.parse(fs.readFileSync("../conf/config.json").toString());

module.exports = async (deployer, network) => {
  console.log("i am me");
  if (network !== "mainnet") {
    await deployer.deploy(TestDaiToken);
    const token = await TestDaiToken.deployed();
    await config.networks[network].testTokenHolders.forEach(async function(holder) {
      await token.transfer(holder, "2000000000000000000000");
    });
  }
};
