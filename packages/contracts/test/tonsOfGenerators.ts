import * as chai from "chai";
import { advanceEvmTime, configureChai } from "../scripts/testHelpers";

const Artonomous = artifacts.require("Artonomous");
const GeneratorRegistry = artifacts.require("GeneratorRegistry");
const SoulToken = artifacts.require("SoulToken");
const GeneratorFactory = artifacts.require("GeneratorFactory");
const Generator = artifacts.require("Generator");
const ArtPieceToken = artifacts.require("ArtPieceToken");

configureChai(chai);
const expect = chai.expect;

contract("Artonomous", accounts => {
  let registry: any;
  let artonomous: any;
  let soul: any;
  let factory: any;
  let generator: any;
  let artPieceToken: any;

  beforeEach(async () => {
    soul = await SoulToken.new();
    const soulAddr = soul.address;
    registry = await GeneratorRegistry.new(soulAddr);
    const registryAddr = registry.address;
    generator = await Generator.new();
    const generatorAddr = generator.address;
    factory = await GeneratorFactory.new(registryAddr, generatorAddr);
    await factory.createGenerator("initial generator", "QmU9dqYZbwAaN4STVN1nZ3PGRFvZe1G1cicGj1QhAtZRy6/upload.p5js");

    artPieceToken = await ArtPieceToken.new("ArtPieceToken", "ART");
    const artPieceTokenAddr = artPieceToken.address;

    artonomous = await Artonomous.new(registryAddr, artPieceTokenAddr, soulAddr);

    const artonomousAddr = artonomous.address;
    await artPieceToken.transferOwnership(artonomousAddr);

    await artonomous.startAuction(100, 0);
  });

  describe("buyArt", () => {
    it("works after adding 10000 generators", async () => {
      for (var i = 0; i < 10000; i++) {
        console.log("CREATE GENERATOR");
        await factory.createGenerator("gen", "QmU9dqYZbwAaN4STVN1nZ3PGRFvZe1G1cicGj1QhAtZRy6/upload.p5js");
        console.log("BUY");
        await expect(artonomous.buyArt({ value: 200 })).to.eventually.be.fulfilled(
          "should have allowed user to buy art with exactly enough ETH sent",
        );
      }
    });
  });
});
