import React from "react";
import styled from "styled-components";
// import imgSrc from "./../assets/images/hotel_3.jpeg";
import imgSrc from "../assets/images/hotel_4.jpeg";
import axios from "axios";

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
  display: flex;
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
`;
const AmenitiesInfo = styled.p`
  font-size: 10px;
  font-weight: 200;
  padding: 0;
  margin: 0;
`;
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
  border-radius: 3px;
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
  position: relative;
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
const Save = styled.div`
  position: absolute;
  height: 8%;
  width: 8%;
  right: 10%;
  top: 10%;
`;
const Suggest = styled.div`
  position: absolute;
  height: 8%;
  width: 8%;
  right: 10%;
  bottom: 10%;
`;


const ratingStrings = ['none', 'Poor', 'Fair', 'Good', 'Great', 'Excellent']

export default function HotelCard({ HotelData, cityCode, checkInDate, checkOutDate, roomQuantity, adults }) {
  const numOfNights = HotelData["numOfNights"];

  const save = function(isSuggested) {
    const hotelData = {
      "trip_id": 1,
      "user_id": 1,
      "check_in_date": checkInDate,
      "check_out_date": checkOutDate,
      "room_quantity": 1,
      "adults": 1,
      "hotel_name": HotelData.name,
      "hotel_address": HotelData.address,
      "city_code": cityCode,
      "rating": 5,
      "amenities": "amenities",
      "price": 1,
      "distance_from_city_center": HotelData.milesFromCenter.toString(),
      // "is_suggested": isSuggested ? "true" : "false",
      // "is_saved": "true",

      "number_of_reviews": 1,
      "number_of_ratings": 1,
      "overall_ratings": 1,
      "sleep_quality_rating": 1,
      "service_rating": 1,
      "facilities_rating": 1,
      "room_comforts_rating": 1,
      "value_for_money_rating": 1,
      "catering_rating": 1,
      "location_rating": 1,
      "points_of_interest_rating": 1,
      "staff_rating": 1,
      "hotel_id": "abc"
    }

    console.log(hotelData);

    axios({
      method: 'post',
      url: 'http://morning-bayou-59969.herokuapp.com/hotels',
      data: hotelData,
      header: {'Access-Control-Allow-Origin': '*'}
    })
      .then((data) => {
        console.log(data,"data from HotelCard.jsx");
        // getNewSavedResult(data.data);
      })
      .catch(console.log)
  }

  if (!numOfNights) {
    numOfNights = 4;
  }
  let amenities = (HotelData.amenities) ? HotelData.amenities : [];
  amenities = amenities.map((perk) => {
    return perk.replace("_", " ").toLowerCase();
  });
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
          <Rating>{HotelData.rating}/5  {ratingStrings[HotelData.rating]}</Rating> :
          null}
      </CenterSection>
      <PricePane>
        <Save onClick={() => save(false)}>
          <svg aria-hidden="true" role="presentation" focusable="false" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="sc-fzqzlV sc-fzqLLg kCMTKY"><path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"></path></svg>
        </Save>
        <Suggest onClick={() => save(true)}>
          <svg aria-hidden="true" role="presentation" focusable="false" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="sc-fzqzlV gMJRj"><g vectorEffect="non-scaling-stroke" transform="translate(0,0)scale(1,1)" fill="none" fillRule="evenodd" stroke="#000" strokeWidth="2"><path d="m27 18v9c0 1.1045695-.8954305 2-2 2h-18c-1.1045695 0-2-.8954305-2-2v-9"></path><path d="m4.5 14.5h23z" transform="matrix(0 1 -1 0 30.5 -1.5)"></path><path d="m6 13 9.2928932-9.29289322c.3905243-.39052429 1.0236893-.39052429 1.4142136 0l9.2928932 9.29289322"></path></g></svg>
        </Suggest>
        <Price>
          ${(HotelData.Price / numOfNights).toFixed(2)}
          <PriceInfo>Nightly price per room</PriceInfo>
        </Price>
      </PricePane>
    </Container>
  );
}
