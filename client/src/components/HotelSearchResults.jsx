import React from "react";
import HotelCard from "./HotelCard";
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  display: grid;
  border-color: red;
  border-width: 3px;
  border-style: solid;
`;

export default function SearchResults(props) {
  return (
    <Container>
      <div>Hotel Search Results</div>
      {props.searchResults.length > 0
        ? props.searchResults.map((data, index) => {
            return <HotelCard key={index} HotelData={data} />;
          })
        : null}
    </Container>
  );
}
