pragma solidity ^0.4.24;

import "zos-lib/contracts/migrations/Initializable.sol";

import "./GeneratorRegistry.sol";

contract Generator is Initializable {
  GeneratorRegistry public registry;
  string public name;
  string public sourceUri;
  address public owner;

  event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

  function initialize(
    GeneratorRegistry _registry,
    string _name,
    address _creator,
    string _sourceUri
  ) isInitializer public {
    name = _name;
    registry = _registry;
    owner = _creator;
    sourceUri = _sourceUri;
  }

  function getGenerator() public view returns (string, address, string) {
    return (
      name,
      owner,
      sourceUri
    );
  }

  /**
    * @dev Throws if called by any account other than the owner.
    */
  modifier onlyOwner() {
    require(isOwner());
    _;
  }

  /**
    * @return true if `msg.sender` is the owner of the contract.
    */
  function isOwner() public view returns (bool) {
    return msg.sender == owner;
  }

  /**
    * @dev Allows the current owner to relinquish control of the contract.
    * @notice Renouncing to ownership will leave the contract without an owner.
    * It will not be possible to call the functions with the `onlyOwner`
    * modifier anymore.
    */
  function renounceOwnership() public onlyOwner {
    emit OwnershipTransferred(owner, address(0));
    owner = address(0);
  }

  /**
    * @dev Allows the current owner to transfer control of the contract to a newOwner.
    * @param newOwner The address to transfer ownership to.
    */
  function transferOwnership(address newOwner) public onlyOwner {
    _transferOwnership(newOwner);
  }

  /**
    * @dev Transfers control of the contract to a newOwner.
    * @param newOwner The address to transfer ownership to.
    */
  function _transferOwnership(address newOwner) internal {
    require(newOwner != address(0));
    emit OwnershipTransferred(owner, newOwner);
    owner = newOwner;
  }

}
