import Home from "./Home";
import { drizzleConnect } from "drizzle-react";
import mapDrizzleStateToProps from "../../drizzle/drizzleHelpers";

const HomeContainer = drizzleConnect(Home, mapDrizzleStateToProps);

export default HomeContainer;
