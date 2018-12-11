pragma experimental ABIEncoderV2;

import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

import "./GeneratorFactory.sol";
import "./Generator.sol";
import "./helpers/Heap.sol";

contract GeneratorRegistry {
    using Heap for Heap.Data;
    Heap.Data data;

    event GeneratorAdded(address generator);

    StandardToken public token;
    uint256 public numGenerators = 0;
    mapping(address => uint256) public stakeByGenerator;
    mapping(address => uint256) public idByGenerator;
    mapping(uint256 => address) public generatorById;
    mapping(address => mapping(address => uint256)) public stakeByUserByGenerator;

    constructor(StandardToken _token) public {
        token = _token;
        data.init();
    }

    function getActiveGenerator() public view returns (Generator) {
        return Generator(generatorById[getMaxId()]);
    }

    function addGenerator(Generator generator) public {
        numGenerators++;
        idByGenerator[generator] = numGenerators;
        generatorById[numGenerators] = generator;
        emit GeneratorAdded(address(generator));
    }

    function depositStake(address generatorAddress, uint256 stake) public {
        require(stake > 0, "cannot deposit 0 stake");
        require(idByGenerator[generatorAddress] > 0, "cannot deposit stake in generator that has not been added");
        if (stakeByGenerator[generatorAddress] > 0) {
           data.extractById(idByGenerator[generatorAddress]);
        }
        stakeByGenerator[generatorAddress] += stake;
        stakeByUserByGenerator[msg.sender][generatorAddress] += stake;
        data.insert(stakeByGenerator[generatorAddress], idByGenerator[generatorAddress]);
        require(token.transferFrom(msg.sender, this, stake), "unable to transfer tokens, check that GeneratorRegistry is approved as a spender");
    }

    function withdrawStake(address generatorAddress, uint256 stake) public {
        require(stakeByUserByGenerator[msg.sender][generatorAddress] >= stake, "cannot withdraw more stake than user has staked to this generator");
        require(stake > 0, "cannot withdraw 0 stake");
        require(idByGenerator[generatorAddress] > 0, "cannot deposit stake in generator that has not been added");
        data.extractById(idByGenerator[generatorAddress]);
        stakeByGenerator[generatorAddress] -= stake;
        stakeByUserByGenerator[msg.sender][generatorAddress] -= stake;
        data.insert(stakeByGenerator[generatorAddress], idByGenerator[generatorAddress]);

        require(token.transfer(msg.sender, stake), "unable to transfer tokens");
    }

    function getToken() public view returns (address) {
        return token;
    }

    function getGeneratorStake(Generator g) public view returns (uint256) {
        return stakeByGenerator[address(g)];
    }

    function getUserGeneratorStake(address user, Generator g) public view returns (uint256) {
        return stakeByUserByGenerator[user][address(g)];
    }

    // heap view functions
    function dump() public view returns (Heap.Node[]) {
        return data.dump();
    }
    function getMax() public view returns (Heap.Node) {
        return data.getMax();
    }
    function getMaxId() public view returns (uint256) {
        return data.getMaxId();
    }
    function getById(uint256 id) public view returns (Heap.Node) {
        return data.getById(id);
    }
    function getByIndex(uint256 i) public view returns (Heap.Node) {
        return data.getByIndex(i);
    }
    function size() public view returns (uint256) {
        return data.size();
    }
    function indices(uint256 id) public view returns (uint256) {
        return data.indices[id];
    }
}