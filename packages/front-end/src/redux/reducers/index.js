import { combineReducers, AnyAction } from "redux";
import {
  generatorCode,
  generatorUri,
  generatorAddresses,
  myGeneratorAddresses,
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
  soulUserRegistryApprovalBalance,
} from "./accountReducers";
import { auctionData, auctionLength, historicalAuctionIDs, historicalAuctions, userToBoughtArts, historicalAuctionsByGenerator } from "./auctionReducers";

export default combineReducers({
  generatorCode,
  generatorUri,
  generatorAddresses,
  myGeneratorAddresses,
  generatorCreators,
  generatorNames,
  generatorStakes,
  generatorUserStakes,
  account,
  soulBalance,
  daiBalance,
  daiUserSoulApprovalBalance,
  daiUserArtonomousApprovalBalance,
  soulUserRegistryApprovalBalance,
  auctionData,
  auctionLength,
  historicalAuctionIDs,
  historicalAuctions,
  historicalAuctionsByGenerator,
  userToBoughtArts
});
