import store from "../../store";
import Web3 from "web3";

export const WEB3_INITIALIZED = "WEB3_INITIALIZED";
function web3Initialized(results) {
  return {
    type: WEB3_INITIALIZED,
    payload: results,
  };
}

const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

export const getWeb3 = () => {
  return web3;
};
