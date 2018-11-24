pragma solidity ^0.4.24;

import "./GeneratorRegistry.sol";
import "./tokens/ArtPieceToken.sol";
import "./tokens/SoulToken.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Artonomous {
    using SafeMath for uint256;

    event ArtonomousAuctionStarted(uint256 indexed blockNumber);
    event ArtonomousArtBought(address indexed buyer, uint256 indexed blockNumber, uint256 price);

    struct Auction {
        uint256 blockNumber;
        uint256 endTime;
        uint256 startingPrice;
    }

    uint256 public currentAuctionBlockNumber;

    GeneratorRegistry public registry;
    ArtPieceToken public pieceToken;
    SoulToken public soulToken;

    uint256 public AUCTION_LENGTH = 2400; // 24 hours
    Auction public currentAuction;

    constructor(address stakingAddr, address artToken, address soulTokenAddr) public {
        registry = GeneratorRegistry(stakingAddr);
        pieceToken = ArtPieceToken(artToken);   
        soulToken = SoulToken(soulTokenAddr);
    }

    function getCurrentAuctionBlockNumber() view public returns (uint256) {
        return currentAuctionBlockNumber;
    }

    function startAuction(uint256 prevBoughtPrice, uint256 prevPrice) public {
        require(currentAuction.blockNumber == 0);
        Generator currentGenerator = registry.getActiveGenerator();
        pieceToken.mint(this, block.number, address(currentGenerator));
        currentAuction = Auction({
            blockNumber: block.number,
            endTime: now + AUCTION_LENGTH,
            startingPrice: getStartingPrice(prevBoughtPrice, prevPrice)
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

    function buyArt() external payable {
        uint256 blockNumber = currentAuction.blockNumber;
        require(blockNumber > 0);
        if (currentAuction.endTime > now) {
            buyArtInternal();
        } else {
            claimArtInternal();
        }
    }

    function buyArtInternal() internal {
        uint256 blockNumber = currentAuction.blockNumber;

        uint256 startingPrice = currentAuction.startingPrice;
        uint256 timeLeft = currentAuction.endTime - block.timestamp;
        uint256 percentageTime = (timeLeft * 10000) / AUCTION_LENGTH;
        uint256 buyPrice = (percentageTime * startingPrice) / 10000;

        require(msg.value >= buyPrice);


        pieceToken.transferFrom(this, msg.sender, blockNumber);
        delete currentAuction;

        uint256 remainder = msg.value - buyPrice;
        msg.sender.transfer(remainder); // refund extra
        soulToken.depositArtPayment.value(buyPrice)();

        emit ArtonomousArtBought(msg.sender, blockNumber, buyPrice);

        startAuction(buyPrice, startingPrice);
    }

    // after 24 hours, anyone can claim for free
    function claimArtInternal() internal {
        uint256 blockNumber = currentAuction.blockNumber;
        uint256 startingPrice = currentAuction.startingPrice;

        pieceToken.transferFrom(this, msg.sender, blockNumber);
        delete currentAuction;

        emit ArtonomousArtBought(msg.sender, blockNumber, 0);

        startAuction(0, startingPrice);
    }
}
