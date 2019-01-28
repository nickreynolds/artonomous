import * as fsapi from "../../fsapi";
import { getWeb3 } from "../../util/web3/getWeb3";
import { SoulToken, DaiToken } from "../../wrappers/contractWrappers";
export const SET_ACCOUNT = "SET_ACCOUNT";
export const SET_SOUL_BALANCE = "SET_SOUL_BALANCE";
export const SET_DAI_BALANCE = "SET_DAI_BALANCE";
console.log("SoulToken: ", SoulToken);

export const setAccount = account => {
  return { type: SET_ACCOUNT, data: { account } };
};
export const setSoulBalance = balance => {
  return { type: SET_SOUL_BALANCE, data: { balance } };
};
export const setDaiBalance = balance => {
  return { type: SET_DAI_BALANCE, data: { balance } };
};

export const getAccount = () => {
  return async function(dispatch, getState) {
    const web3 = await getWeb3();
    const currentBlock = await web3.eth.getBlockNumber();
    console.log("currentBlock: ", currentBlock);
    const accounts = await web3.eth.getAccounts();
    if (accounts && accounts.length > 0 && accounts[0]) {
      const account = accounts[0];
      dispatch(setAccount(account));
      SoulToken.events.Transfer({ filter: { from: account }, fromBlock: currentBlock }, (error, event) => {
        console.log("soul event: ", event);
        getSoulBalance(account, dispatch);
      });
      SoulToken.events.Transfer({ filter: { to: account }, fromBlock: currentBlock }, (error, event) => {
        console.log("soul event: ", event);
        getSoulBalance(account, dispatch);
      });
      DaiToken.events.Transfer({ filter: { from: account }, fromBlock: currentBlock }, (error, event) => {
        console.log("dai event: ", event);
        getDaiBalance(account, dispatch);
      });
      DaiToken.events.Transfer({ filter: { to: account }, fromBlock: currentBlock }, (error, event) => {
        console.log("dai event: ", event);
        getDaiBalance(account, dispatch);
      });
      getSoulBalance(account, dispatch);
      getDaiBalance(account, dispatch);
    }
  };
};

const getSoulBalance = async (account, dispatch) => {
  const soulBalance = await SoulToken.methods.balanceOf(account).call();
  dispatch(setSoulBalance(soulBalance));
};

const getDaiBalance = async (account, dispatch) => {
  const daiBalance = await DaiToken.methods.balanceOf(account).call();
  dispatch(setDaiBalance(daiBalance));
};
