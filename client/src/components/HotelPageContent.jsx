import React from "react";
import styled from "styled-components";
import HotelSearchResults from "./HotelSearchResults";
import HotelSuggestions from "./HotelSuggestions";

const ResultsContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  column-gap: 10%;
`;

export default function HotelPageContent(props) {
  console.log("rendered");
  console.log(props.searchResults);
  return (
    <ResultsContainer>
      <HotelSearchResults searchResults={props.searchResults} cityCode={props.cityCode} checkInDate={props.checkInDate} checkOutDate={props.checkOutDate} roomQuantity={props.roomQuantity} adults={props.adults} />
      <HotelSuggestions searchResults={props.searchResults}/>
    </ResultsContainer>
  );
}
