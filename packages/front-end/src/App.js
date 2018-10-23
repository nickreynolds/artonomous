import React, { Component } from "react";
import { DrizzleContext } from "drizzle-react";
import DrizzleApp from "./DrizzleApp";
export default props => (
  <DrizzleContext.Consumer>
    {drizzleContext => {
      const { drizzle, drizzleState, initialized } = drizzleContext;
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
