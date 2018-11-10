pragma solidity ^0.4.24;

import "./GeneratorRegistry.sol";
import "./tokens/ArtPieceToken.sol";
import "./tokens/SoulToken.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Artonomous {
    using SafeMath for uint256;

    event ArtonomousAuctionStarted(uint indexed blockNumber);
    event ArtonomousArtBought(address indexed buyer, uint indexed blockNumber, uint price);

    struct Auction {
        uint blockNumber;
        uint endTime;
        uint startingPrice;
    }

    GeneratorRegistry public registry;
    ArtPieceToken public pieceToken;
    SoulToken public soulToken;

    uint public AUCTION_LENGTH = 360; // 6 minutes
    Auction public currentAuction;

    constructor(address stakingAddr, address artToken, address soulTokenAddr) public {
        registry = GeneratorRegistry(stakingAddr);
        pieceToken = ArtPieceToken(artToken);   
        soulToken = SoulToken(soulTokenAddr);
    }

    function startAuction(uint prevBoughtPrice, uint prevPrice) public {
        require(currentAuction.blockNumber == 0);
        Generator currentGenerator = registry.getActiveGenerator();
        pieceToken.mint(this, block.number, address(currentGenerator));
        currentAuction = Auction({
            blockNumber: block.number,
            endTime: now + AUCTION_LENGTH,
            startingPrice: getStartingPrice(prevBoughtPrice, prevPrice)
        });
        emit ArtonomousAuctionStarted(block.number);
    }

    // placeholder
    function getStartingPrice(uint prevBoughtPrice, uint prevPrice) internal pure returns (uint) {
        if (prevBoughtPrice > 0) {
            return prevBoughtPrice.mul(20).div(2);
        } else {
            return prevPrice.mul(20).div(21);
        }
    }

    function buyArt() external payable {
        uint blockNumber = currentAuction.blockNumber;
        require(blockNumber > 0);
        if (currentAuction.endTime > now) {
            buyArtInternal();
        } else {
            claimArtInternal();
        }
    }

    function buyArtInternal() internal {
        uint blockNumber = currentAuction.blockNumber;

        uint startingPrice = getBuyPrice(currentAuction.startingPrice);

        uint buyPrice = ((currentAuction.endTime - now) / AUCTION_LENGTH) * startingPrice;

        require(msg.value >= buyPrice);


        pieceToken.transferFrom(this, msg.sender, blockNumber);
        delete currentAuction;

        uint remainder = msg.value - buyPrice;
        msg.sender.transfer(remainder); // refund extra
        soulToken.depositArtPayment.value(buyPrice)();

        emit ArtonomousArtBought(msg.sender, blockNumber, buyPrice);

        startAuction(buyPrice, startingPrice);
    }

    // placeholder
    function getBuyPrice(uint startingPrice) internal pure returns (uint) {
        return startingPrice;
    }

    // after 24 hours, anyone can claim for free
    function claimArtInternal() internal {
        uint blockNumber = currentAuction.blockNumber;
        uint startingPrice = getBuyPrice(currentAuction.startingPrice);

        pieceToken.transferFrom(this, msg.sender, blockNumber);
        delete currentAuction;

        emit ArtonomousArtBought(msg.sender, blockNumber, 0);

        startAuction(0, startingPrice);
    }
}
