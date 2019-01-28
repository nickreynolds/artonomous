import { SET_ACCOUNT, SET_SOUL_BALANCE, SET_DAI_BALANCE } from "../actionCreators/accountActions";

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
