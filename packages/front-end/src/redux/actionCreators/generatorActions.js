import * as fsapi from "../../fsapi";
import { getWeb3 } from "../../util/web3/getWeb3";
import { getGenerator, GeneratorRegistry } from "../../wrappers/contractWrappers";

export const ADD_GENERATOR_CODE = "ADD_GENERATOR_CODE";
export const ADD_GENERATOR_URI = "ADD_GENERATOR_URI";
export const ADD_GENERATOR_ADDRESS = "ADD_GENERATOR_ADDRESS";
export const ADD_GENERATOR_NAME = "ADD_GENERATOR_NAME";
export const ADD_GENERATOR_CREATOR = "ADD_GENERATOR_CREATOR";
export const SET_GENERATOR_STAKE = "SET_GENERATOR_STAKE";
export const SET_GENERATOR_USER_STAKE = "SET_GENERATOR_USER_STAKE";

export const addGeneratorCode = (generator, code) => {
  return { type: ADD_GENERATOR_CODE, data: { generator, code } };
};
export const addGeneratorUri = (generator, uri) => {
  return { type: ADD_GENERATOR_URI, data: { generator, uri } };
};
export const addGeneratorAddress = generatorAddress => {
  return { type: ADD_GENERATOR_ADDRESS, data: { generatorAddress } };
};
export const addGeneratorName = (generator, generatorName) => {
  return { type: ADD_GENERATOR_NAME, data: { generator, generatorName } };
};
export const addGeneratorCreator = (generator, creator) => {
  return { type: ADD_GENERATOR_CREATOR, data: { generator, creator } };
};
export const setGeneratorStake = (generator, stake) => {
  return { type: SET_GENERATOR_STAKE, data: { generator, stake } };
};
export const setGeneratorUserStake = (generator, user, stake) => {
  return { type: SET_GENERATOR_USER_STAKE, data: { generator, user, stake } };
};

const generatorInfoRequests = new Map();
export const getGeneratorInfo = generatorAddress => {
  return async function(dispatch, getState) {
    const user = getState().account;
    const web3 = await getWeb3();
    const currentBlock = await web3.eth.getBlockNumber();
    // console.log("user: ", user);
    dispatch(addGeneratorAddress(generatorAddress));
    if (generatorAddress && !generatorInfoRequests.get(generatorAddress)) {
      const generator = getGenerator(generatorAddress);
      generatorInfoRequests.set(generatorAddress, true);
      const result = await generator.methods.getGenerator().call();
      const result2 = await GeneratorRegistry.methods.getGeneratorStake(generatorAddress).call();
      const userStakeResults = await GeneratorRegistry.methods.getUserGeneratorStake(user, generatorAddress).call();
      dispatch(setGeneratorUserStake(generatorAddress, user, userStakeResults));
      dispatch(setGeneratorStake(generatorAddress, result2));
      dispatch(addGeneratorName(generatorAddress, result[0]));
      dispatch(addGeneratorCreator(generatorAddress, result[1]));
      dispatch(addGeneratorUri(generatorAddress, result[2]));
      fsapi.getTextFileFromPath(result[2].split("/")[0]).then(code => {
        dispatch(addGeneratorCode(generatorAddress, code));
      });
      GeneratorRegistry.events.StakeWithdrawn(
        { filter: { generator: generatorAddress }, fromBlock: currentBlock },
        (error, event) => {
          getStake(generatorAddress, dispatch);
          getUserStake(generatorAddress, user, dispatch);
        },
      );

      GeneratorRegistry.events.StakeAdded(
        { filter: { generator: generatorAddress }, fromBlock: currentBlock },
        (error, event) => {
          getStake(generatorAddress, dispatch);
          getUserStake(generatorAddress, user, dispatch);
        },
      );
    }
  };
};

const getStake = async (generatorAddress, dispatch) => {
  const result = await GeneratorRegistry.methods.getGeneratorStake(generatorAddress).call();
  dispatch(setGeneratorStake(generatorAddress, result));
};

const getUserStake = async (generatorAddress, user, dispatch) => {
  const result = await GeneratorRegistry.methods.getGeneratorUserStake(generatorAddress, user).call();
  dispatch(setGeneratorUserStake(generatorAddress, user, result));
};

export const beginGetGenerators = () => {
  return async function(dispatch, getState) {
    GeneratorRegistry.events.GeneratorAdded({ filter: {}, fromBlock: 0 }, (error, event) => {
      // console.log("GeneratorRegistry event: ", event);
      dispatch(getGeneratorInfo(event.returnValues.generator));
    });
  };
};
