import * as fsapi from "../../fsapi";
import { getGenerator } from "../../wrappers/contractWrappers";

export const ADD_GENERATOR_CODE = "ADD_GENERATOR_CODE";
export const ADD_GENERATOR_URI = "ADD_GENERATOR_URI";

export const addGeneratorCode = (generator, code) => {
  return { type: ADD_GENERATOR_CODE, data: { generator, code } };
};

export const addGeneratorUri = (generator, uri) => {
  return { type: ADD_GENERATOR_URI, data: { generator, uri } };
};

const generatorCodeRequests = new Map();
export const getGeneratorCode = generatorAddress => {
  return async function(dispatch, getState) {
    if (generatorAddress && !generatorCodeRequests.get(generatorAddress)) {
      const generator = getGenerator(generatorAddress);
      generatorCodeRequests.set(generatorAddress, true);
      generator.methods.sourceUri().call({}, function(error, result) {
        if (result) {
          dispatch(addGeneratorUri(generatorAddress, result));
          fsapi.getTextFileFromPath(result.split("/")[0]).then(code => {
            dispatch(addGeneratorCode(generatorAddress, code));
          });
        }
      });
    }
  };
};
