import {
  SET_ACCOUNT,
  SET_SOUL_BALANCE,
  SET_DAI_BALANCE,
  SET_DAI_USER_SOUL_APPROVAL,
  SET_DAI_USER_ARTONOMOUS_APPROVAL,
  SET_SOUL_USER_REGISTRY_APPROVAL,
} from "../actionCreators/accountActions";

export function account(state = "", action) {
  switch (action.type) {
    case SET_ACCOUNT:
      return action.data.account;
    default:
      return state;
  }
}

export function soulBalance(state = 0, action) {
  switch (action.type) {
    case SET_SOUL_BALANCE:
      return action.data.balance;
    default:
      return state;
  }
}

export function daiBalance(state = 0, action) {
  switch (action.type) {
    case SET_DAI_BALANCE:
      return action.data.balance;
    default:
      return state;
  }
}

export function daiUserSoulApprovalBalance(state = 0, action) {
  switch (action.type) {
    case SET_DAI_USER_SOUL_APPROVAL:
      return action.data.approvalBalance;
    default:
      return state;
  }
}

export function daiUserArtonomousApprovalBalance(state = 0, action) {
  switch (action.type) {
    case SET_DAI_USER_ARTONOMOUS_APPROVAL:
      return action.data.approvalBalance;
    default:
      return state;
  }
}

export function soulUserRegistryApprovalBalance(state = 0, action) {
  switch (action.type) {
    case SET_SOUL_USER_REGISTRY_APPROVAL:
      return action.data.approvalBalance;
    default:
      return state;
  }
}