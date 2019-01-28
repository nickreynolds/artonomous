import * as fsapi from "../../fsapi";
import { getGenerator, GeneratorRegistry } from "../../wrappers/contractWrappers";

export const ADD_GENERATOR_CODE = "ADD_GENERATOR_CODE";
export const ADD_GENERATOR_URI = "ADD_GENERATOR_URI";
export const ADD_GENERATOR_ADDRESS = "ADD_GENERATOR_ADDRESS";
export const ADD_GENERATOR_NAME = "ADD_GENERATOR_NAME";
export const ADD_GENERATOR_CREATOR = "ADD_GENERATOR_CREATOR";
export const SET_GENERATOR_STAKE = "SET_GENERATOR_STAKE";

export const addGeneratorCode = (generator, code) => {
  return { type: ADD_GENERATOR_CODE, data: { generator, code } };
};
export const addGeneratorUri = (generator, uri) => {
  return { type: ADD_GENERATOR_URI, data: { generator, uri } };
};
export const addGeneratorAddress = generatorAddress => {
  return { type: ADD_GENERATOR_ADDRESS, data: { generatorAddress } };
};
export const addGeneratorName = generatorName => {
  return { type: ADD_GENERATOR_NAME, data: { generatorName } };
};
export const addGeneratorCreator = creator => {
  return { type: ADD_GENERATOR_CREATOR, data: { creator } };
};
export const setGeneratorStake = stake => {
  return { type: SET_GENERATOR_STAKE, data: { stake } };
};

const generatorInfoRequests = new Map();
export const getGeneratorInfo = generatorAddress => {
  return async function(dispatch, getState) {
    dispatch(addGeneratorAddress(generatorAddress));
    if (generatorAddress && !generatorInfoRequests.get(generatorAddress)) {
      const generator = getGenerator(generatorAddress);
      generatorInfoRequests.set(generatorAddress, true);
      const result = await generator.methods.getGenerator().call();
      console.log("result: ", result);
      dispatch(addGeneratorName(generatorAddress, result[0]));
      dispatch(addGeneratorCreator(generatorAddress, result[1]));
      dispatch(addGeneratorUri(generatorAddress, result[2]));
      fsapi.getTextFileFromPath(result[2].split("/")[0]).then(code => {
        dispatch(addGeneratorCode(generatorAddress, code));
      });
      dispatch(getStake(generatorAddress));
    }
  };
};

const getStake = generatorAddress => {
  return async function(dispatch, getState) {
    console.log("GO GET STAKE");
    const result = await GeneratorRegistry.methods.getGeneratorStake(generatorAddress).call();
    console.log("getStake result: ", result);
    dispatch(setGeneratorStake(generatorAddress, result));
  };
};

export const beginGetGenerators = () => {
  return async function(dispatch, getState) {
    GeneratorRegistry.events.GeneratorAdded({ filter: {}, fromBlock: 0 }, (error, event) => {
      console.log("GeneratorRegistry event: ", event);
      dispatch(getGeneratorInfo(event.returnValues.generator));
    });
  };
};
