import {
  ADD_GENERATOR_CODE,
  ADD_GENERATOR_URI,
  ADD_GENERATOR_ADDRESS,
  ADD_GENERATOR_CREATOR,
  ADD_GENERATOR_NAME,
  SET_GENERATOR_STAKE,
  SET_GENERATOR_USER_STAKE,
} from "../actionCreators/generatorActions";
import { Map, Set } from "immutable";

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

export function generatorCreators(state = Map(), action) {
  switch (action.type) {
    case ADD_GENERATOR_CREATOR:
      return state.set(action.data.generator, action.data.creator);
    default:
      return state;
  }
}

export function generatorNames(state = Map(), action) {
  switch (action.type) {
    case ADD_GENERATOR_NAME:
      return state.set(action.data.generator, action.data.name);
    default:
      return state;
  }
}

export function generatorStakes(state = Map(), action) {
  switch (action.type) {
    case SET_GENERATOR_STAKE:
      return state.set(action.data.generator, action.data.stake);
    default:
      return state;
  }
}

export function generatorUserStakes(state = Map(), action) {
  switch (action.type) {
    case SET_GENERATOR_USER_STAKE:
      let userMap = state.get(action.data.generator);
      if (!userMap) {
        userMap = Map();
      }
      userMap = userMap.set(action.data.user, action.data.stake);
      return state.set(action.data.generator, userMap);
    default:
      return state;
  }
}

export function generatorAddresses(state = Set(), action) {
  switch (action.type) {
    case ADD_GENERATOR_ADDRESS:
      return state.add(action.data.generatorAddress);
    default:
      return state;
  }
}
