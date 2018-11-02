pragma solidity ^0.4.24;

import "./GeneratorRegistry.sol";
import "./tokens/ArtPieceToken.sol";
import "./tokens/SoulToken.sol";

contract Artonomous {

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

    uint public AUCTION_LENGTH = 86400; // 24 hours
    Auction public currentAuction;

    constructor(address stakingAddr, address artToken, address soulTokenAddr) public {
        registry = GeneratorRegistry(stakingAddr);
        pieceToken = ArtPieceToken(artToken);   
        soulToken = SoulToken(soulTokenAddr);
    }

    function startAuction() public {
        require(currentAuction.blockNumber == 0);
        Generator currentGenerator = registry.getActiveGenerator();
        pieceToken.mint(this, block.number, address(currentGenerator));
        currentAuction = Auction({
            blockNumber: block.number,
            endTime: now + AUCTION_LENGTH,
            startingPrice: getStartingPrice()
        });
        emit ArtonomousAuctionStarted(block.number);
    }

    // placeholder
    function getStartingPrice() internal pure returns (uint) {
        return 100000000000000000;
    }

    function buyArt() external payable {
        uint blockNumber = currentAuction.blockNumber;
        require(blockNumber > 0);
        require(currentAuction.endTime > now);

        uint buyPrice = getBuyPrice(currentAuction.startingPrice);
        require(msg.value >= buyPrice);


        pieceToken.transferFrom(this, msg.sender, blockNumber);
        delete currentAuction;

        uint remainder = msg.value - buyPrice;
        msg.sender.transfer(remainder); // refund extra
        soulToken.depositArtPayment.value(buyPrice)();

        emit ArtonomousArtBought(msg.sender, blockNumber, buyPrice);

        startAuction();
    }

    // placeholder
    function getBuyPrice(uint startingPrice) internal pure returns (uint) {
        return startingPrice;
    }

    // after 24 hours, anyone can claim for free
    function claimArt() external {
        uint blockNumber = currentAuction.blockNumber;
        require(blockNumber > 0);
        require(currentAuction.endTime <= now);

        pieceToken.transferFrom(this, msg.sender, blockNumber);
        delete currentAuction;

        emit ArtonomousArtBought(msg.sender, blockNumber, 0);

        startAuction();
    }
}
