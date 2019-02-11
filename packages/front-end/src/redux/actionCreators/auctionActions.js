import { Artonomous } from "../../wrappers/contractWrappers";
import { getWeb3 } from "../../util/web3/getWeb3";
export const SET_CURRENT_AUCTION = "SET_CURRENT_AUCTION";
export const SET_AUCTION_LENGTH = "SET_AUCTION_LENGTH";
export const ADD_HISTORICAL_AUCTION = "ADD_HISTORICAL_AUCTION";

export const setCurrentAuction = auction => {
  return { type: SET_CURRENT_AUCTION, data: { auction } };
};
export const setAuctionLength = length => {
  return { type: SET_AUCTION_LENGTH, data: { length } };
};
export const addHistoricalAuction = auction => {
  return { type: ADD_HISTORICAL_AUCTION, data: { auction } };
};

export const beginGetCurrentAuction = () => {
  return async function(dispatch, getState) {
    const web3 = await getWeb3();
    const currentBlock = await web3.eth.getBlockNumber();
    const length = await Artonomous.methods.AUCTION_LENGTH().call();
    dispatch(setAuctionLength(length));
    Artonomous.events.ArtonomousAuctionStarted({ filter: {}, fromBlock: currentBlock }, (error, event) => {
      getCurrentAuction(dispatch);
    });
    getCurrentAuction(dispatch);
  };
};

export const beginGetHistoricalAuctions = () => {
  return async function(dispatch, getState) {
    Artonomous.events.ArtonomousArtBought({ filter: {}, fromBlock: 0 }, (error, event) => {
      // console.log("event.result: ", event);
      dispatch(addHistoricalAuction(event));
    });
  };
};

const getCurrentAuction = async dispatch => {
  const auction = await Artonomous.methods.currentAuction().call();
  // console.log("auction: ", auction);
  dispatch(setCurrentAuction(auction));
};
