import React from "react";
import HotelCard from "./HotelCard";
import styled from "styled-components";

const Container = styled.div`
  border-color: red;
  border-width: 3px;
  border-style: solid;
  display: grid;
  height: 100%;
  grid-template-rows: 1fr 15fr;
`;
const FeedContainer = styled.div`
  border-color: red;
  border-width: 3px;
  border-style: solid;
  overflow-y: scroll;
  display: grid;
`;

// display: grid;

export default function SearchResults(props) {
  return (
    <Container>
      <p>Hotel Search Results</p>
      <FeedContainer>
        {props.searchResults.length > 0
          ? props.searchResults.map((data, index) => {
              return <HotelCard key={index} HotelData={data} />;
            })
          : null}
      </FeedContainer>
    </Container>
  );
}
