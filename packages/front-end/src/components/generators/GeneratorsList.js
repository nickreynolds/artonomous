import React, { Component } from "react";
import Generator from "./Generator";
import styled from "styled-components";

const GeneratorsDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const GeneratorGrid = styled.div`
  max-width: 95%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
`;

const GridListItem = styled.div`
  height: 650px;
  flex-basis: 20%;
  -ms-flex: auto;
  width: 400px;
  position: relative;
  padding: 10px;
  margin: 10px;
  box-sizing: border-box;
`;

class GeneratorsList extends Component {
  render() {
    console.log("generators: ", this.props.generators);
    return (
      <GeneratorsDiv>
        {this.props.generators && (
          <GeneratorGrid>
            {this.props.generators
              .slice()
              .reverse()
              .map(generator => {
                return (
                  <GridListItem>
                    <Generator {...this.props} generator={generator} />
                  </GridListItem>
                );
              })}
            {this.props.generators
              .slice()
              .reverse()
              .map(generator => {
                return (
                  <GridListItem>
                    <Generator {...this.props} generator={generator} />
                  </GridListItem>
                );
              })}
            {this.props.generators
              .slice()
              .reverse()
              .map(generator => {
                return (
                  <GridListItem>
                    <Generator {...this.props} generator={generator} />
                  </GridListItem>
                );
              })}
            {this.props.generators
              .slice()
              .reverse()
              .map(generator => {
                return (
                  <GridListItem>
                    <Generator {...this.props} generator={generator} />
                  </GridListItem>
                );
              })}
          </GeneratorGrid>
        )}
      </GeneratorsDiv>
    );
  }
}

export default GeneratorsList;
