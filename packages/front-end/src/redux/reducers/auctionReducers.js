import { SET_CURRENT_AUCTION, SET_AUCTION_LENGTH, ADD_HISTORICAL_AUCTION } from "../actionCreators/auctionActions";
import { List, Map } from "immutable";

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

export function historicalAuctionIDs(state = List(), action) {
  switch (action.type) {
    case ADD_HISTORICAL_AUCTION:
      return state.push(action.data.auction.blockNumber);
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
