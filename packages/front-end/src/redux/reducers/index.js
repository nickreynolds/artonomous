import { combineReducers, AnyAction } from "redux";
import { generatorCode, generatorUri } from "./generatorsReducers";
import { account, soulBalance, daiBalance } from "./accountReducers";
import { auctionData, auctionLength, historicalAuctionIDs, historicalAuctions } from "./auctionReducers";

export default combineReducers({
  generatorCode,
  generatorUri,
  account,
  soulBalance,
  daiBalance,
  auctionData,
  auctionLength,
  historicalAuctionIDs,
  historicalAuctions,
});
