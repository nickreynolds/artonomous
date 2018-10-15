var Artonomous = artifacts.require("./Artonomous.sol");
const user = "0xcec56f1d4dc439e298d5f8b6ff3aa6be58cd6fdf";
module.exports = async function(deployer, network, accounts) {
  const arty = await Artonomous.deployed();
  console.log("artonomous addr: ", arty.address);
  web3.eth.sendTransaction({
    from: accounts[0],
    to: user,
    value: web3.toWei(1, "ether"),
  });
};
