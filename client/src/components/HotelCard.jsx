import React from "react";
import styled from "styled-components";
// import imgSrc from "./../assets/images/hotel_3.jpeg";
import imgSrc from "../assets/images/hotel_4.jpeg";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid black;
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
  width: 70%;
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

const Rating = styled.div`
  position: absolute;
  right: 5%;
  top: 30%;
  border: 1px solid black;
  min-height: 50px;
  width: 20%;
  padding: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 300;
  box-shadow: 2px 2px 2px;
`;

const PricePane = styled.div`
  width: 25%;
  border-left: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Price = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: green;
`;
const PriceInfo = styled.p`
  font-size: 12px;
  font-weight: 200;
  padding:0;
  margin: 0;
`


const ratingStrings = ['none', 'Poor', 'Fair', 'Good', 'Great', 'Excellent']

export default function HotelCard({ HotelData, numOfNights }) {
  if (!numOfNights) {
    numOfNights = 4;
  }
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
        {(HotelData.rating) ?
        <Rating>{HotelData.rating}/5  {ratingStrings[HotelData.rating]}</Rating>:
        null}
      </CenterSection>
      <PricePane>
        <Price>
          ${(HotelData.Price / numOfNights).toFixed(2)}
          <PriceInfo>Nightly price per room</PriceInfo>
        </Price>
      </PricePane>
    </Container>
  );
}
