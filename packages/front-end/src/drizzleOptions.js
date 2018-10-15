import Artonomous from "./../contracts/Artonomous.json";
import GeneratorRegistry from "../contracts/GeneratorRegistry.json";
import GeneratorFactory from "../contracts/GeneratorFactory.json";
import SoulToken from "../contracts/SoulToken.json";
// console.log("Artonomous: ", Artonomous);
// console.log("GeneratorRegistry: ", GeneratorRegistry);
// console.log("SoulToken: ", SoulToken);
const drizzleOptions = {
  web3: {
    block: false,
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:8545"
    }
  },
  contracts: [Artonomous, GeneratorRegistry, GeneratorFactory, SoulToken],
  events: {
    SimpleStorage: ["StorageSet"]
  },
  polls: {
    accounts: 1500
  }
};

export default drizzleOptions;
