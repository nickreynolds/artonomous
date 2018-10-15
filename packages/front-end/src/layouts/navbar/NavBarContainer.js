import NavBar from "./NavBar";
import { drizzleConnect } from "drizzle-react";
const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    SimpleStorage: state.contracts.SimpleStorage,
    TutorialToken: state.contracts.TutorialToken,
    SoulToken: state.contracts.SoulToken,
    drizzleStatus: state.drizzleStatus
  };
};
const NavBarContainer = drizzleConnect(NavBar, mapStateToProps);
export default NavBarContainer;
