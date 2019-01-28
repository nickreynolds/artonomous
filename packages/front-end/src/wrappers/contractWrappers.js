import SoulArtifact from "../../contracts/SoulToken.json";
import DaiArtifact from "../../contracts/TestDaiToken.json";
import ArtonomousArtifact from "../../contracts/Artonomous.json";
import GeneratorArtifact from "../../contracts/Generator.json";
import GeneratorRegistryArtifact from "../../contracts/GeneratorRegistry.json";
import { getWeb3 } from "../util/web3/getWeb3.js";

const web3 = getWeb3();

console.log("web3: ", web3);
export const SoulToken = new web3.eth.Contract(SoulArtifact.abi, SoulArtifact.networks[4].address);
export const DaiToken = new web3.eth.Contract(DaiArtifact.abi, DaiArtifact.networks[4].address);
export const Artonomous = new web3.eth.Contract(ArtonomousArtifact.abi, ArtonomousArtifact.networks[4].address);
export const getGenerator = address => {
  console.log("address: ", address);
  return new web3.eth.Contract(GeneratorArtifact.abi, address);
};
export const GeneratorRegistry = new web3.eth.Contract(
  GeneratorRegistryArtifact.abi,
  GeneratorRegistryArtifact.networks[4].address,
);
