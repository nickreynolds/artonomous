import { ADD_GENERATOR_CODE, ADD_GENERATOR_URI } from "../actionCreators/generatorActions";

export function generatorCode(state = new Map(), action) {
  switch (action.type) {
    case ADD_GENERATOR_CODE:
      return state.set(action.data.generator, action.data.code);
    default:
      return state;
  }
}

export function generatorUri(state = new Map(), action) {
  switch (action.type) {
    case ADD_GENERATOR_URI:
      console.log("set generator uri: ", action.data.generator);
      return state.set(action.data.generator, action.data.uri);
    default:
      return state;
  }
}
