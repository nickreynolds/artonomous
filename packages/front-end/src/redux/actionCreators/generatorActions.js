import * as fsapi from "../../fsapi";

export const ADD_GENERATOR_CODE = "ADD_GENERATOR_CODE";
export const ADD_GENERATOR_URI = "ADD_GENERATOR_URI";

export const addGeneratorCode = (generator, code) => {
  return { type: ADD_GENERATOR_CODE, data: { generator, code } };
};

export const addGeneratorUri = (generator, uri) => {
  return { type: ADD_GENERATOR_URI, data: { generator, uri } };
};

const generatorCodeRequests = new Map();
export const getGeneratorCode = generatorContract => {
  return function(dispatch, getState) {
    console.log("generatorCodeRequests: ", generatorCodeRequests);
    if (!generatorCodeRequests.get(generatorContract._address)) {
      console.log("get generator code: ", generatorContract);
      console.log("get generator _address ", generatorContract._address);
      generatorCodeRequests.set(generatorContract._address, true);
      generatorContract.methods.sourceUri().call({}, function(error, result) {
        if (result) {
          dispatch(addGeneratorUri(generatorContract._address, result));
          console.log("result: ", result);
          fsapi.getTextFileFromPath(result.split("/")[0]).then(code => {
            dispatch(addGeneratorCode(generatorContract._address, code));
          });
        }
      });
    }
  };
};
