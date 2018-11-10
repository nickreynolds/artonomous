import Artonomous from "./../contracts/Artonomous.json";
import GeneratorRegistry from "../contracts/GeneratorRegistry.json";
import GeneratorFactory from "../contracts/GeneratorFactory.json";
import SoulToken from "../contracts/SoulToken.json";
import ArtPieceToken from "../contracts/ArtPieceToken.json";

const drizzleOptions = {
  web3: {
    block: false,
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:8545",
    },
  },
  contracts: [Artonomous, ArtPieceToken, GeneratorRegistry, GeneratorFactory, SoulToken],
  events: {
    Artonomous: [
      { eventName: "ArtonomousArtBought", eventOptions: { fromBlock: 0 } },
      { eventName: "ArtonomousAuctionStarted", eventOptions: { fromBlock: 0 } },
    ],
    SoulToken: [
      { eventName: "LogMint", eventOptions: { fromBlock: 0 } },
      { eventName: "LogWithdraw", eventOptions: { fromBlock: 0 } },
    ],
  },
  polls: {
    accounts: 1500,
  },
};

export default drizzleOptions;
