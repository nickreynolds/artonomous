var fs = require("fs");
var TestDaiToken = artifacts.require("./TestDaiToken.sol");

const config = JSON.parse(fs.readFileSync("../conf/config.json").toString());

module.exports = async (deployer, network, accounts) => {
  console.log("i am me");
  if (network !== "mainnet") {
    await deployer.deploy(TestDaiToken);
    const token = await TestDaiToken.deployed();
    console.log("network: ", network)
    const testTokenHolders = config.networks[network].testTokenHolders;
    const holders = [...testTokenHolders, accounts[0]];
    await holders.forEach(async function(holder) {
      await token.transfer(holder, "2000000000000000000000");
    });
  }
};
