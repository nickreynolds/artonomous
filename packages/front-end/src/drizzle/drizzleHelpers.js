// May still need this even with data function to refresh component on updates for this contract.
export const mapDrizzleStateToProps = state => {
  console.log("map state to props 1");
  return {
    accounts: state.accounts,
    SimpleStorage: state.contracts.SimpleStorage,
    TutorialToken: state.contracts.TutorialToken,
    drizzleStatus: state.drizzleStatus
  };
};
