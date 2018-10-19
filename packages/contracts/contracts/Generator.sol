pragma solidity ^0.4.24;

import "zos-lib/contracts/migrations/Initializable.sol";

import "./GeneratorRegistry.sol";

contract Generator is Initializable {
  GeneratorRegistry public registry;
  string public name;
  address public creator;
  string public sourceUri;

  function initialize(
    GeneratorRegistry _registry,
    string _name,
    address _creator,
    string _sourceUri
  ) isInitializer public {
    name = _name;
    registry = _registry;
    creator = _creator;
    sourceUri = _sourceUri;
  }

  function getGenerator() public view returns (string, address, string) {
    return (
      name,
      creator,
      sourceUri
    );
  }
}