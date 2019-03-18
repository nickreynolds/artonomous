import { getWeb3 } from "../../util/web3/getWeb3";
import { SoulToken, DaiToken, Artonomous, GeneratorRegistry } from "../../wrappers/contractWrappers";
export const SET_ACCOUNT = "SET_ACCOUNT";
export const SET_SOUL_BALANCE = "SET_SOUL_BALANCE";
export const SET_DAI_BALANCE = "SET_DAI_BALANCE";
export const SET_DAI_USER_SOUL_APPROVAL = "SET_DAI_USER_SOUL_APPROVAL";
export const SET_DAI_USER_ARTONOMOUS_APPROVAL = "SET_DAI_USER_ARTONOMOUS_APPROVAL";
export const SET_SOUL_USER_REGISTRY_APPROVAL = "SET_SOUL_USER_REGISTRY_APPROVAL";

export const setAccount = account => {
  return { type: SET_ACCOUNT, data: { account } };
};
export const setSoulBalance = balance => {
  return { type: SET_SOUL_BALANCE, data: { balance } };
};
export const setDaiBalance = balance => {
  return { type: SET_DAI_BALANCE, data: { balance } };
};
export const setDaiUserSoulApproval = approvalBalance => {
  return { type: SET_DAI_USER_SOUL_APPROVAL, data: { approvalBalance } };
};
export const setDaiUserArtonomousApproval = approvalBalance => {
  return { type: SET_DAI_USER_ARTONOMOUS_APPROVAL, data: { approvalBalance } };
};
export const setSoulUserRegistryApproval = approvalBalance => {
  return { type: SET_SOUL_USER_REGISTRY_APPROVAL, data: { approvalBalance } };
};

let SoulTransferSub1, SoulTransferSub2, DaiTransferSub1, DaiTransferSub2, DaiApprovalSub1, DaiApprovalSub2, SoulApprovalSub1;

export const getAccount = () => {
  return async function (dispatch, getState) {
    const web3 = await getWeb3();
    const currentBlock = await web3.eth.getBlockNumber();
    const accounts = await web3.eth.getAccounts();

    const prevAccount = getState().account;
    if (accounts && accounts.length > 0 && accounts[0] && prevAccount !== accounts[0]) {
      const account = accounts[0];
      dispatch(setAccount(account));

      if (SoulTransferSub1) {
        SoulTransferSub1.unsubscribe();
      }
      if (SoulTransferSub2) {
        SoulTransferSub2.unsubscribe();
      }
      if (DaiTransferSub1) {
        DaiTransferSub1.unsubscribe();
      }
      if (DaiTransferSub2) {
        DaiTransferSub2.unsubscribe();
      }
      if (DaiApprovalSub1) {
        DaiApprovalSub1.unsubscribe();
      }
      if (DaiApprovalSub2) {
        DaiApprovalSub2.unsubscribe();
      }
      if (SoulApprovalSub1) {
        SoulApprovalSub1.unsubscribe();
      }

      SoulTransferSub1 = SoulToken.events.Transfer({ filter: { from: account }, fromBlock: currentBlock }, (error, event) => {
        getSoulBalance(account, dispatch);
        getSoulUserRegistryApproval(account, dispatch);
      });
      SoulTransferSub2 = SoulToken.events.Transfer({ filter: { to: account }, fromBlock: currentBlock }, (error, event) => {
        getSoulBalance(account, dispatch);
        getSoulUserRegistryApproval(account, dispatch);
      });
      DaiTransferSub1 = DaiToken.events.Transfer({ filter: { from: account }, fromBlock: currentBlock }, (error, event) => {
        getDaiBalance(account, dispatch);
        getDaiUserSoulApproval(account, dispatch);
        getDaiUserArtonomousApproval(account, dispatch);
      });
      DaiTransferSub2 = DaiToken.events.Transfer({ filter: { to: account }, fromBlock: currentBlock }, (error, event) => {
        getDaiBalance(account, dispatch);
      });
      DaiApprovalSub1 = DaiToken.events.Approval(
        { filter: { owner: account, spender: SoulToken._address }, fromBlock: currentBlock },
        (error, event) => {
          getDaiUserSoulApproval(account, dispatch);
        },
      );
      DaiApprovalSub2 = DaiToken.events.Approval(
        { filter: { owner: account, spender: Artonomous._address }, fromBlock: currentBlock },
        (error, event) => {
          getDaiUserArtonomousApproval(account, dispatch);
        },
      );
      SoulApprovalSub1 = SoulToken.events.Approval(
        { filter: { owner: account, spender: GeneratorRegistry._address }, fromBlock: currentBlock },
        (error, event) => {
          getSoulUserRegistryApproval(account, dispatch);
        },
      );
      getSoulBalance(account, dispatch);
      getDaiBalance(account, dispatch);
      getDaiUserSoulApproval(account, dispatch);
      getDaiUserArtonomousApproval(account, dispatch);
      getSoulUserRegistryApproval(account, dispatch);
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

const getDaiUserSoulApproval = async (account, dispatch) => {
  const approvalBalance = await DaiToken.methods.allowance(account, SoulToken._address).call();
  dispatch(setDaiUserSoulApproval(approvalBalance));
};

const getDaiUserArtonomousApproval = async (account, dispatch) => {
  const approvalBalance = await DaiToken.methods.allowance(account, Artonomous._address).call();
  dispatch(setDaiUserArtonomousApproval(approvalBalance));
};

const getSoulUserRegistryApproval = async (account, dispatch) => {
  const approvalBalance = await SoulToken.methods.allowance(account, GeneratorRegistry._address).call();
  dispatch(setSoulUserRegistryApproval(approvalBalance));
};
