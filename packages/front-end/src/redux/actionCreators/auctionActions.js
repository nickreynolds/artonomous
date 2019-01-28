import { Artonomous } from "../../wrappers/contractWrappers";
import { getWeb3 } from "../../util/web3/getWeb3";
export const SET_CURRENT_AUCTION = "SET_CURRENT_AUCTION";
export const SET_AUCTION_LENGTH = "SET_AUCTION_LENGTH";

export const setCurrentAuction = auction => {
  return { type: SET_CURRENT_AUCTION, data: { auction } };
};
export const setAuctionLength = length => {
  return { type: SET_AUCTION_LENGTH, data: { length } };
};

export const beginGetCurrentAuction = () => {
  return async function(dispatch, getState) {
    const web3 = await getWeb3();
    const currentBlock = await web3.eth.getBlockNumber();
    console.log("currentBlock: ", currentBlock);
    const length = await Artonomous.methods.AUCTION_LENGTH().call();
    console.log("length: ", length);
    dispatch(setAuctionLength(length));
    Artonomous.events.ArtonomousAuctionStarted({ filter: {}, fromBlock: currentBlock }, (error, event) => {
      console.log("auction event: ", event);
      getCurrentAuction(dispatch);
    });
    getCurrentAuction(dispatch);
  };
};

const getCurrentAuction = async dispatch => {
  const auction = await Artonomous.methods.currentAuction().call();
  console.log("auction: ", auction);
  dispatch(setCurrentAuction(auction));
};
