import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  display: grid;
  border-color: red;
  border-width: 1px;
  border-style: solid;
`;

export default function HotelSuggestions(props) {
  return (
    <Container>
      <div>Hotel Suggestions</div>
    </Container>
  );
}
