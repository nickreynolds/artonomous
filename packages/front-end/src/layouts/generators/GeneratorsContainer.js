import Generators from "./Generators";
import { drizzleConnect } from "drizzle-react";
import mapDrizzleStateToProps from "../../drizzle/drizzleHelpers";

const GeneratorsContainer = drizzleConnect(Generators, mapDrizzleStateToProps);

export default GeneratorsContainer;
