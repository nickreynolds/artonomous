require("babel-register");
require("babel-polyfill");

module.exports = {
  test_directory: "build/test",
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
    ganache: {
      host: "localhost",
      port: 8545,
      network_id: "50"
    }
  }
};
