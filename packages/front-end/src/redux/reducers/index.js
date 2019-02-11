import { combineReducers, AnyAction } from "redux";
import {
  generatorCode,
  generatorUri,
  generatorAddresses,
  generatorCreators,
  generatorNames,
  generatorStakes,
  generatorUserStakes,
} from "./generatorsReducers";
import {
  account,
  soulBalance,
  daiBalance,
  daiUserSoulApprovalBalance,
  daiUserArtonomousApprovalBalance,
} from "./accountReducers";
import { auctionData, auctionLength, historicalAuctionIDs, historicalAuctions } from "./auctionReducers";

export default combineReducers({
  generatorCode,
  generatorUri,
  generatorAddresses,
  generatorCreators,
  generatorNames,
  generatorStakes,
  generatorUserStakes,
  account,
  soulBalance,
  daiBalance,
  daiUserSoulApprovalBalance,
  daiUserArtonomousApprovalBalance,
  auctionData,
  auctionLength,
  historicalAuctionIDs,
  historicalAuctions,
});
