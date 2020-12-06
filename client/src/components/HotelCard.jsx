import React from "react";
import styled from "styled-components";
// import imgSrc from "./../assets/images/hotel_3.jpeg";
import imgSrc from "../assets/images/hotel_4.jpeg";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;

  border-color: black;
  border-width: 1px;
  border-style: solid;
`;

const CenterSection = styled.div`
  background-color: #80cbc4;
  border: 1px solid #fff;
  text-align: center;
  flex: 2;
`;

const HotelImageWrapper = styled.div`
  flex: 1;
`;

const HotelImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
  border-color: black;
  border-width: 1px;
  border-style: solid;
`;

export default function HotelCard({ HotelData }) {
  return (
    <Container>
      <HotelImage src={imgSrc} />
      <CenterSection>{HotelData["name"]}</CenterSection>
      <div>{HotelData["rating"]}</div>
    </Container>
  );
}
