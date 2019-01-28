import { ADD_GENERATOR_CODE, ADD_GENERATOR_URI } from "../actionCreators/generatorActions";
import { Map } from "immutable";
export function generatorCode(state = Map(), action) {
  switch (action.type) {
    case ADD_GENERATOR_CODE:
      return state.set(action.data.generator, action.data.code);
    default:
      return state;
  }
}

export function generatorUri(state = Map(), action) {
  switch (action.type) {
    case ADD_GENERATOR_URI:
      return state.set(action.data.generator, action.data.uri);
    default:
      return state;
  }
}
