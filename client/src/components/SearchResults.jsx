import React from "react";
import styled from "styled-components";
import HotelSearchResults from "./HotelSearchResults";
import HotelSuggestions from "./HotelSuggestions";

const ResultsContainer = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 3fr 1fr;
  column-gap: 10%;
`;

export default function SearchResults(props) {
  return (
    <ResultsContainer>
      {/* {props.searchResults.length > 0
        ? props.searchResults.map((data, index) => (
            <Flight key={index} data={data}></Flight>
          ))
        : null} */}
      <HotelSearchResults />
      <HotelSuggestions />
    </ResultsContainer>
  );
}
