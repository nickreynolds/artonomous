import { SET_CURRENT_AUCTION, SET_AUCTION_LENGTH } from "../actionCreators/auctionActions";

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
