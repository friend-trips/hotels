import React from "react";
import styled from "styled-components";
// import imgSrc from "./../assets/images/hotel_3.jpeg";
import imgSrc from "../assets/images/hotel_4.jpeg";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  border-color: black;
  border-width: 1px;
  border-style: solid;
  width: 100%;
  position: relative;
`;

const HotelImageWrapper = styled.div`
  flex: 1;
  width: 25%;
`;
const HotelImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
  border-color: black;
  border-width: 1px;
  border-style: solid;
`;

const CenterSection = styled.div`
  background-color: #ffffff;
  border: 1px solid #fff;
  flex: 2;
  width: 50%;
  display:flex;
  flex-direction: column;
  padding: 2%;
  position: relative;
`;
const HotelInfo = styled.div`
  width: 70%;
  height: 50%;
  display: flex;
  flex-direction: column;
`;
const HotelName = styled.h4`
  margin: 0;
  font-weight: 300;
  `;
const HotelAddress = styled.h5`
  margin: 0;
  font-size: 11px;
  font-weight: 200;
`;
const Amenities = styled.div`
  display:flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`;
const AmenitySectionTitle = styled.p`
  font-size: 12px;
  font-weight: 200;
  padding: 0;
`
const AmenitiesInfo = styled.p`
font-size: 10px;
  font-weight: 200;
  padding:0;
  margin: 0;
`
const Amenity = styled.p`
  font-size: 12px;
  font-weight: 200;
  border: 1px solid black;
  margin: 2px;
  padding: 2px
`
const Price = styled.div`
  width: 25%;
  border: 1px solid black;
`;
const Rating = styled.div`
  position: absolute;
  right: 10px;
  border: 1px solid black;
  height: 100px;
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 300;
`;

const ratingStrings = ['none', 'Poor', 'Fair', 'Good', 'Great', 'Excellent']

export default function HotelCard({ HotelData }) {
  console.log('HOTEL DATA', HotelData)
  let amenities = (HotelData.amenities) ? HotelData.amenities : [];
  amenities = amenities.map((perk) => {
    return perk.replace('_', ' ').toLowerCase();
  })
  return (
    <Container>
      <HotelImageWrapper>
        <HotelImage src={imgSrc} />
      </HotelImageWrapper>
      <CenterSection>
        <HotelInfo>
          <HotelName>{HotelData.name}</HotelName>
          <HotelAddress>{HotelData.address}</HotelAddress>
        </HotelInfo>
        {(HotelData.amenities) ?
          <>
            <AmenitySectionTitle>Amenities:</AmenitySectionTitle>
            <Amenities>
              {amenities.slice(0, 4).map((perk) => {
                return (
                  <Amenity>{perk}</Amenity>
                )
              })}</Amenities>
            {amenities.length > 5 ?
              <AmenitiesInfo>
                And {amenities.length - 5} more...
              </AmenitiesInfo> : null}
          </> :
          null
        }
        <Rating>{ratingStrings[HotelData["rating"]]} {HotelData["rating"]}</Rating>
      </CenterSection>
      <Price>
        $$$
      </Price>
    </Container>
  );
}
