import React, { Component } from "react";
import { DrizzleContext } from "drizzle-react";
import DrizzleApp from "./DrizzleApp";
console.log("well 1");
export default props => (
  <DrizzleContext.Consumer>
    {drizzleContext => {
      const { drizzle, drizzleState, initialized } = drizzleContext;
      console.log("this: ", this);
      console.log("props: ", props);
      return (
        <div>
          <DrizzleApp drizzle={drizzle} drizzleState={drizzleState} initialized={initialized}>
            {props.children}
          </DrizzleApp>
        </div>
      );
    }}
  </DrizzleContext.Consumer>
);
