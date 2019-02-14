import { SET_CURRENT_AUCTION, SET_AUCTION_LENGTH, ADD_HISTORICAL_AUCTION } from "../actionCreators/auctionActions";
import { Set, Map } from "immutable";

export function auctionData(state = {}, action) {
  switch (action.type) {
    case SET_CURRENT_AUCTION:
      return action.data.auction;
    default:
      return state;
  }
}

export function auctionLength(state = 0, action) {
  switch (action.type) {
    case SET_AUCTION_LENGTH:
      return action.data.length;
    default:
      return state;
  }
}

export function historicalAuctionIDs(state = Set(), action) {
  switch (action.type) {
    case ADD_HISTORICAL_AUCTION:
      return state.add(action.data.auction.blockNumber);
    default:
      return state;
  }
}

export function historicalAuctions(state = Map(), action) {
  switch (action.type) {
    case ADD_HISTORICAL_AUCTION:
      return state.set(action.data.auction.blockNumber, action.data.auction);
    default:
      return state;
  }
}

export function historicalAuctionsByGenerator(state = Map(), action) {
  switch (action.type) {
    case ADD_HISTORICAL_AUCTION:
      let generatorAuctions = state.get(action.data.auction.generator);
      if (!generatorAuctions) {
        generatorAuctions = Set();
      }
      generatorAuctions = generatorAuctions.add(action.data.auction.blockNumber);
      return state.set(action.data.auction.generator, generatorAuctions);
    default:
      return state;
  }
}

export function userToBoughtArts(state = Map(), action) {
  switch (action.type) {
    case ADD_HISTORICAL_AUCTION:
      let userBoughtArts = state.get(action.data.auction.buyer);
      if (!userBoughtArts) {
        userBoughtArts = Set();
      }
      userBoughtArts = userBoughtArts.add(action.data.auction.blockNumber);
      return state.set(action.data.auction.buyer, userBoughtArts);
    default:
      return state;
  }
}
