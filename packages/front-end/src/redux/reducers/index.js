import { combineReducers, AnyAction } from "redux";
import { generatorCode, generatorUri } from "./generatorsReducers";

export default combineReducers({
  generatorCode,
  generatorUri,
});
