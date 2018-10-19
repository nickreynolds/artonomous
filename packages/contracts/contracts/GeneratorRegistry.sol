pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

import "./GeneratorFactory.sol";
import "./Generator.sol";

contract GeneratorRegistry {
    // event RegistryEntryEV(address indexed registryEntry, bytes32 indexed eventType);
    event RegistryEntryEVT(bytes32 indexed context, address registryEntry, bytes32 eventType);

    StandardToken public token;
    Generator[] public generators;
    mapping(address => uint) public stakeByGenerator;
    mapping(address => mapping(address => uint)) public stakeByUserByGenerator;

    constructor(StandardToken _token) public {
        token = _token;
    }

    function getActiveGenerator() public view returns (Generator) {
        Generator maxStakeGenerator;
        uint maxStake;

        for(uint i = 0; i < generators.length; i++) {
            Generator g = generators[i];
            if (stakeByGenerator[address(g)] > maxStake) {
                maxStakeGenerator = g;
                maxStake = stakeByGenerator[address(g)];
            }
        }

        return maxStakeGenerator;
    }

    function addGenerator(Generator _generator) public {
        generators.push(_generator);
    }

    function depositStake(uint generatorIndex, uint stake) public {
        require(generatorIndex < generators.length);
        Generator g = generators[generatorIndex];
        stakeByGenerator[address(g)] += stake;
        stakeByUserByGenerator[msg.sender][address(g)] += stake;
        require(token.transferFrom(msg.sender, this, stake), "unable to transfer tokens, check that GeneratorRegistry is approved as a spender");
    }

    function withdrawStake(uint generatorIndex, uint stake) public {
        require(generatorIndex < generators.length);
        Generator g = generators[generatorIndex];
        require(stakeByUserByGenerator[msg.sender][address(g)] >= stake);
        stakeByGenerator[address(g)] -= stake;
        stakeByUserByGenerator[msg.sender][address(g)] -= stake;

        require(token.transfer(msg.sender, stake), "unable to transfer tokens");
    }

    function getToken() public view returns (address) {
        return token;
    }

    function getGenerators() public view returns (Generator[]) {
        return generators;
    }

    function getGeneratorStake(Generator g) public view returns (uint) {
        return stakeByGenerator[address(g)];
    }

    function getUserGeneratorStake(address user, Generator g) public view returns (uint) {
        return stakeByUserByGenerator[user][address(g)];
    }
}