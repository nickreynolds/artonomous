pragma solidity ^0.4.24;

import "./GeneratorRegistry.sol";
import "./tokens/ArtPieceToken.sol";
import "./tokens/SoulToken.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";


contract Artonomous {
    using SafeMath for uint256;

    event ArtonomousAuctionStarted(uint256 indexed blockNumber);
    event ArtonomousArtBought(address indexed buyer, uint256 indexed blockNumber, address indexed generator, uint256 price);

    struct Auction {
        uint256 blockNumber;
        uint256 endTime;
        uint256 startingPrice;
        Generator generator;
    }

    uint256 public currentAuctionBlockNumber;

    GeneratorRegistry public registry;
    ArtPieceToken public pieceToken;
    SoulToken public soulToken;
    StandardToken public reserveToken;
    address public beneficiary;

    uint256 public AUCTION_LENGTH = 2400; // 24 hours
    Auction public currentAuction;

    constructor(address stakingAddr, address artToken, address soulTokenAddr, address reserveTokenAddr, address beneficiaryAddr) public {
        registry = GeneratorRegistry(stakingAddr);
        pieceToken = ArtPieceToken(artToken);   
        soulToken = SoulToken(soulTokenAddr);
        reserveToken = StandardToken(reserveTokenAddr);
        beneficiary = beneficiaryAddr;
    }

    function getCurrentAuctionBlockNumber() view public returns (uint256) {
        return currentAuctionBlockNumber;
    }

    function startAuction(uint256 prevBoughtPrice, uint256 prevPrice) public {
        require(currentAuction.blockNumber == 0, "auction already in progress");
        Generator currentGenerator = registry.getActiveGenerator();
        require(address(currentGenerator) != address(0), "current generator not set");
        pieceToken.mint(this, block.number, address(currentGenerator));
        currentAuction = Auction({
            blockNumber: block.number,
            endTime: now + AUCTION_LENGTH,
            startingPrice: getStartingPrice(prevBoughtPrice, prevPrice),
            generator: currentGenerator
        });
        currentAuctionBlockNumber = block.number;
        emit ArtonomousAuctionStarted(block.number);
    }

    // placeholder
    function getStartingPrice(uint256 prevBoughtPrice, uint256 prevPrice) internal pure returns (uint256) {
        if (prevBoughtPrice > 0) {
            return prevBoughtPrice.mul(2);
        } else {
            return prevPrice.mul(20).div(30);
        }
    }

    function buyArt(uint256 value) external {
        uint256 blockNumber = currentAuction.blockNumber;
        require(blockNumber > 0);
        if (currentAuction.endTime > now) {
            buyArtInternal(value);
        } else {
            claimArtInternal();
        }
    }

    function buyArtInternal(uint256 value) internal {
        uint256 blockNumber = currentAuction.blockNumber;

        uint256 startingPrice = currentAuction.startingPrice;
        uint256 timeLeft = currentAuction.endTime - block.timestamp;
        uint256 percentageTime = (timeLeft * 10000) / AUCTION_LENGTH;
        uint256 buyPrice = (percentageTime * startingPrice) / 10000;
        Generator currentGenerator = currentAuction.generator;

        require(value >= buyPrice);
        require(reserveToken.transferFrom(msg.sender, this, buyPrice));

        pieceToken.transferFrom(this, msg.sender, blockNumber);
        delete currentAuction;

        uint256 buyPriceThird = buyPrice.div(3);
        require(reserveToken.transfer(beneficiary, buyPriceThird), "token transfer failure");
        
        require(reserveToken.transfer(address(currentGenerator), buyPriceThird), "token transfer failure");


        uint256 buyPriceRemaining = buyPrice.sub(buyPriceThird.mul(2));

        reserveToken.approve(soulToken, buyPriceRemaining);
        soulToken.depositArtPayment(buyPriceRemaining);

        emit ArtonomousArtBought(msg.sender, blockNumber, address(currentGenerator), buyPriceRemaining);

        startAuction(buyPrice, startingPrice);
    }

    // after 24 hours, anyone can claim for free
    function claimArtInternal() internal {
        uint256 blockNumber = currentAuction.blockNumber;
        uint256 startingPrice = currentAuction.startingPrice;
        Generator currentGenerator = currentAuction.generator;

        pieceToken.transferFrom(this, msg.sender, blockNumber);
        delete currentAuction;

        emit ArtonomousArtBought(msg.sender, blockNumber, address(currentGenerator), 0);

        startAuction(0, startingPrice);
    }
}
